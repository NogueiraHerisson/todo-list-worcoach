import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import routes from "./routes"
import winston from "winston"

const app = express()
const PORT = 3000

// Configure Winston logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
})

// Middleware to log requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`)
  next()
})

// Middleware
app.use(bodyParser.json())

// Routes
app.use("/api", routes)

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions)

mongoose.connection.on("connected", () => {
  logger.info("Connected to MongoDB")
})

mongoose.connection.on("error", (err) => {
  logger.error(`MongoDB connection error: ${err}`)
})

// Start the server
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`)
})
