const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
      trim:true
    },

    email: {
      type: String,
      required: true,
      unique: true,

    },

    password: {
      type: String,
      required: true,
    },
    isVoted:{
      type:Boolean,
      default:false
    },
    isVerified:{
      type:Boolean,
      default:false
    },
    verificationToken: { type: String},
    
  },
  
  { versionKey: false }
);

// Pre-save middleware to hash the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const User = model("user", userSchema);

module.exports = User;
