import { randomUUID } from "crypto";
import { configureOpenAI } from "../config/openai-configuration.js";
import User from "../models/User.js"

import OpenAI from 'openai';

export const getSpecificConversation = async (req, res) => {
    try {
        const userId = req.params.userId
        const chatId = req.params.chatId
        const user = await User.findById(userId)
        if (!user) {
            return res.status(401).json({ message: "User not registered" })
        }
        const chats = user.chats.filter((item) => item.id === chatId)
        return res.status(200).json(chats)

    } catch (error) {
        console.log(error)

    }


}

export const createNewChatBot = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const newChatGroupId = randomUUID();
        const chatGroup = { id: newChatGroupId, chats: [] }
        user.chats.push(chatGroup)
        await user.save()
        res.status(200).json(newChatGroupId)

    } catch (error) {
        console.log(error)

    }

}

export const generateChatCompletion = async (req, res) => {
    const { message, userId, chatBotCredential } = req.body
    try {
        const user = await User.findById(userId)
        if (!user)
            return res.status(401).json({ message: "User not registered " })

        // Find the chat group by chatGroupId
        let chatGroup

        
        chatGroup = user.chats.find(group => group.id === chatBotCredential);
        const indice = user.chats.findIndex(function (item) {
            return item.id === chatBotCredential;
        });
        const chats = user.chats[indice].chats.map(({ role, content }) => ({
            role,
            content
        }))
        user.chats[indice].chats.push({ content: message, role: "user" })

        chats.push({ content: message, role: "user" })

        const config = configureOpenAI()
        const openai = new OpenAI(config)
        const chatResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        user.chats[indice].chats.push(chatResponse.choices[0].message);
        await user.save()
        return res.status(200).json(
            user.chats[indice].chats
        )



    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong" });
    }
}


