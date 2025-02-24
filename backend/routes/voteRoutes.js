const express = require("express");
const auth = require("../middleware/auth");
const { createVote, getResults } = require("../controllers/voteController");
const router = express.Router();

router.post("/", auth,createVote);
router.get("/results", auth,getResults);


module.exports = router;
