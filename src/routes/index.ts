import express from "express"
import todoRoutes from "./todoRoutes"

const router = express.Router()

router.use(todoRoutes)

export default router
