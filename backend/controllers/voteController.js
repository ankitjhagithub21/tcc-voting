const Vote = require("../models/vote");
const User = require("../models/user");

exports.createVote = async (req, res) => {
  const { team } = req.body;
  const userId = req.user?.userId;

  if (!team) {
    return res.status(400).json({ message: "Team is required." });
  }

  try {
    // Find user and check if they are verified
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: "You are not verified." });
    }

    // Check if the user has already voted
    const existingVote = await Vote.findOne({ userId });
    if (existingVote) {
      return res.status(400).json({ message: "You have already voted." });
    }

    // Create and save the vote
    const vote = new Vote({ userId, team });
    user.isVoted = true;

    await Promise.all([user.save(), vote.save()]);

    res.status(201).json({ message: "Vote recorded successfully!" });
  } catch (error) {
    console.error("Error creating vote:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


exports.getResults = async (req, res) => {
  try {

    const teamA_votes = await Vote.countDocuments({ team: "TeamA" });
    const teamB_votes = await Vote.countDocuments({ team: "TeamB" });
    res.status(200).json({ TeamA: teamA_votes, TeamB: teamB_votes });

  } catch (error) {
    
    console.error(error);
    res.status(500).json({ message: "Server error." });

  }
};
