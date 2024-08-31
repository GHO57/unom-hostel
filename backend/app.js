const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")

const cors = require("cors")
const errorHandlingMiddleware = require("./middleware/errorHandlingMiddleware")

//.env config

dotenv.config({
    path : "./config/config.env"
})

module.exports = app
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const user = require("./routes/userRoutes")

app.use("/api/v1/user", user)

//middleware for errors

app.use(errorHandlingMiddleware)

module.exports = app

