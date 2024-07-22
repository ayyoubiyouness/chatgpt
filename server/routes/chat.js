import express from "express"
import { generateChatCompletion } from "../controllers/chat.js"

const router = express.Router()

router.post("/new", generateChatCompletion)

export default router