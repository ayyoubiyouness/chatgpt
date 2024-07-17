import axios from "axios"

export const sendChatRequest = async (message,userId,  chatBotCredential) => {

    try {
        console.log(message)
        
        const res = await axios.post("https://chatgpt-r8cc.onrender.com/api/chat/new", { message, userId,  chatBotCredential })
        const data = res.data
        return data

    } catch (error) {
        console.log(error)
        

    }

}

