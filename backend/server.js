require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const connectDB = require('./db/conn')
const app = express()

const authRouter = require("./routes/authRoutes")
const voteRouter = require("./routes/voteRoutes")

const port = process.env.PORT || 3000
connectDB();

app.use(express.json());
app.use(cookieParser());

// CORS setup to allow credentials
app.use(
  cors({
    origin:process.env.FRONTEND_URL, 
    credentials: true,               
  })
);

app.get('/', (req, res) => {
  res.json({message:"Api working"})
})

app.use("/api/auth",authRouter)
app.use("/api/votes",voteRouter)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})