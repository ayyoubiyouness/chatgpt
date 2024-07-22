import axios from "axios"

export const sendChatRequest = async (message) => {

    try {
        console.log(message)
        
        const res = await axios.post("http://localhost:8800/api/chat/new", { message, userId : "669ec073658a8a56e279c684",  chatGroupId : "944fb0c7-00be-4101-8101-de053278a396" })
        const data = res.data
        return data

    } catch (error) {
        console.log(error)
        

    }

}

