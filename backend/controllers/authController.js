const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const sendEmail = require("../utils/sendMail");

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Send JWT token as an HTTP-only secure cookie
const sendCookie = (user, res) => {
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: true, 
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

// ✅ Register user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email." });
  }

  const hasSpace = /\s/.test(password);

  if(hasSpace){
    return res.status(400).json({message:"Do not give space in password"})
  }

  if(password.trim().length < 6){
    return res.status(400).json({message:"Password length should be atleast 6 characters long."})
  }

  try {
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }


    // Create new user
    const newUser = new User({ name, email, password });
    const savedUser = await newUser.save();

    // Send token as a secure cookie
    sendCookie(savedUser, res);

    res.status(201).json({
      message: "User registered successfully.",
      user: {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        isVoted:savedUser.isVoted,
        isVerified:savedUser.isVerified
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// ✅ Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Send token as a secure cookie
    sendCookie(user, res);

    res.status(200).json({
      message: "Login successful.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isVoted:user.isVoted,
        isVerified:user.isVerified
      },
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// ✅ Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// ✅ Logout user
exports.logout = (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({ message: "Logout successful." });
};

exports.sendVerificationLink = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
     
      return res.status(404).json({ message: "User not found." });
    }

    if(user.isVerified){
      return res.status(400).json({ message: "User is already verified." });
    }


     const token = jwt.sign({ email:user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
     user.verificationToken = token;

     const html = `<p>Hello ${user.name},</p>
       <p>Please verify your account by clicking the link below:</p>
       <a href="${process.env.FRONTEND_URL}/verify/${token}">Verify Account</a>`;


    await sendEmail(user.email,"Account Verification",html)
     
    res.status(200).json({message:"Check Your email."});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};



exports.verifyUser = async (req, res) => {
  const { token } = req.params;

  if (!token) {
    return res.status(400).json({ message: "Token is required." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    const user = await User.findOne({ email: decoded.email }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.isVerified) {
      return res.status(200).json({ message: "User is already verified." });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: "Account verified successfully!",user});
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    res.status(400).json({ message: "Invalid or expired token." });
  }
};


