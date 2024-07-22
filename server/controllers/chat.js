import { randomUUID } from "crypto";
import { configureOpenAI } from "../config/openai-configuration.js";
import User from "../models/User.js"

import OpenAI from 'openai';
import { finished } from "stream";

export const generateChatCompletion = async (req, res) => {
    const { message, userId, chatGroupId } = req.body
    try {
        const user = await User.findById(userId)
        if (!user)
            return res.status(401).json({ message: "User not registered " })

        // Find the chat group by chatGroupId
        let chatGroup
        if (chatGroupId) {
            console.log(user)
            chatGroup = user.chats.find(group => group.id === chatGroupId);
            const indice = user.chats.findIndex(function (item) {
                return item.id === chatGroupId;
            });
            const chats = user.chats[indice].chats.map(({ role, content }) => ({
                role,
                content
            }))
            user.chats[indice].chats.push({ content: message, role: "user" })
            
            chats.push({ content: message, role: "user" })
            console.log(chats)
            const config = configureOpenAI()
            const openai = new OpenAI(config)
            const chatResponse = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: chats,
            });
            user.chats[indice].chats.push(chatResponse.choices[0].message);
            console.log(user.chats[indice].chats) 
            await user.save()
            return  res.status(200).json(
                user.chats[indice].chats
            )

        }


        if (!chatGroupId) {

            const newChatGroupId = randomUUID();
            chatGroup = { id: newChatGroupId, chats: [] }
            user.chats.push(chatGroup)
            const indice = user.chats.findIndex(function (item) {
                return item.id === newChatGroupId;
            });


            const chats = user.chats[indice].chats.map(({ role, content }) => ({
                role,
                content
            }))
            user.chats[indice].chats.push({ content: message, role: "user" })
            chats.push({ content: message, role: "user" })
            console.log(chats)
            const config = configureOpenAI()
            const openai = new OpenAI(config)
            const chatResponse = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: chats,
            });
            user.chats[indice].chats.push(chatResponse.choices[0].message);
            console.log(user.chats[indice].chats) 
            await user.save()
            console.log("finished")


            return true
        }

        const chats = chatGroup.chats.map(({ role, content }) => ({
            role,
            content
        }))
        chats.push({ content: message, role: "user" })
        user.chats.chats.push({ content: message, role: "user" })
        const config = configureOpenAI()
        const openai = new OpenAI(config)
        const chatResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        user.chats.chats.push(chatResponse.choices[0].message);
        await user.save();
        return res.status(200).json({ chatGroupId: chatGroup.id, chats: chatGroup.chats });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong" });
    }
}


