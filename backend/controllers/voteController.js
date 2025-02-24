const Vote = require("../models/vote");
const User = require("../models/user");

exports.createVote = async (req, res) => {
  
  const { team } = req.body;

  const userId = req.user.userId;

  try {
    const existingVote = await Vote.findOne({ userId });

    if (existingVote) {
      return res.status(400).json({ message: "You have already voted." });
    }

    //store the vote
    const vote = new Vote({
      userId,
      team,
    });

    await vote.save();

    const user = await User.findById(userId).select("-password");

    user.isVoted = true;
    await user.save();
    
    res.status(201).json({ message: "Vote recorded successfully !" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
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
