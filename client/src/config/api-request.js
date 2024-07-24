import axios from "axios"

export const sendChatRequest = async (message,userId,  chatbotId) => {

    try {
        console.log(message)
        
        const res = await axios.post("http://localhost:8800/api/chat/new", { message, userId : userId,  chatGroupId : chatbotId })
        const data = res.data
        return data

    } catch (error) {
        console.log(error)
        

    }

}

