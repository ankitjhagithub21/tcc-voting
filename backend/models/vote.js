const { Schema, model } = require("mongoose");

const voteSchema = new Schema({
 
  userId: {
    type: Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },
  
  team:{
    type: String,
    enum:['TeamA','TeamB'],
    required: true,

  },

  votedAt:{
    type:Date,
    default:Date.now
  }
},{versionKey:false});

const Vote = model("vote", voteSchema);

module.exports = Vote;
