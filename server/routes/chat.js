import express from "express"

import { generateChatCompletion,  getSpecificConversation, createNewChatBot} from "../controllers/chat.js"

const router = express.Router()

router.post("/new", generateChatCompletion);
router.get("/new/chatBot/:id", createNewChatBot);
router.get("/chats/:chatId/:userId", getSpecificConversation);

export default router