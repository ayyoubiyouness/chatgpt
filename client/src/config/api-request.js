import axios from "axios"

export const sendChatRequest = async (message,userId,  chatBotCredential) => {

    try {
        console.log(message)
        
        const res = await axios.post("http://localhost:8800/api/chat/new", { message, userId,  chatBotCredential })
        const data = res.data
        return data

    } catch (error) {
        console.log(error)
        

    }

}

