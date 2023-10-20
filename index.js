const express = require('express')
const cors = require("cors")
const { connection } = require('./config/db')
const { userRouter } = require('./routes/User.routes')
const { auth } = require('./middleware/auth.middleware')
const { recipeRouter } = require('./routes/Recipe.routes')

require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())


app.get("/", (req, res) => {
    res.status(200).send("Basic API Endpoint")
})

app.use("/user", userRouter)

app.use(auth)

app.use("/recipe", recipeRouter)

app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("Connected to the DB")
    } catch (error) {
        console.log(error)
        console.log("Cannot connect to the DB")
    }
    console.log(`Server is running at port ${process.env.PORT}`)
})