const express = require("express")
const mongoose = require("mongoose")
const apiRoutes = require("./routes/product.routes")
const dotenv = require("dotenv")
const cors = require("cors")

const app = express()

// Middleware to parse JSON requests
app.use(express.json())
dotenv.config()
app.use(cors())

// Use the API routes
app.use("/api", apiRoutes)

app.listen(8000, async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb+srv://arshgoyal459:Zxcvbnm1@cluster0.0lsykzj.mongodb.net/stats?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    console.log(`Database connected`)
    console.log(`Server is running`)
  } catch (err) {
    console.log(err.message)
    res.status(500).send({ error: err.message })
  }
})
