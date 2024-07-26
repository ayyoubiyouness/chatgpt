import { Avatar, Box, Typography } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/authContext'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Cursor from './Cursor';




// const ChatItem = ({ role, content }) => {

//     const { user } = useContext(AuthContext)


//     return (


//         role == "assistant" ? (
//             <Box
//                 sx={{
//                     display: "flex",
//                     p: 2,
//                     bgcolor: "#004d5612",
//                     gap: 2,
//                     borderRadius: 2,
//                     marginRight: 1,
//                     flexDirection: "flex-end" ,
//                     my: 1,
//                 }}>
//                 <Avatar sx={{ ml: "0" }}>
//                     <img src="openai.png" alt="openai" width={"30px"} />
//                 </Avatar>
//                 <Box>

//                             <Typography sx={{ fontSize: "20px" }}>
//                                 {content}

//                             </Typography>




//                 </Box>

//             </Box>
//         ) : (
//             <Box
//                 sx={{
//                     display: "flex",
//                     p: 2,
//                     bgcolor: "#004d56",
//                     gap: 2,
//                     mt: 2,
//                     marginRight: 1,
//                     borderRadius: 2,
//                 }}
//             >
//                 <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
//                     {user.name[0]}
//                 </Avatar>
//                 <Box>

//                             <Typography sx={{ fontSize: "20px" }}>
//                                 {content}

//                             </Typography>



//                 </Box>

//             </Box>
//         )
//     )
// }

// export default ChatItem

import './chatItem.css'
const ChatItem = ({ chatMessages, typed }) => {
    const messagesEndRef = useRef(null)
    const [displayResponse, setDisplayResponse] = useState("");
    const [completedTyping, setCompletedTyping] = useState(false);
    const { user } = useContext(AuthContext)
    useEffect(() => {
        if (!chatMessages?.length) {
            return;
        }
        // if (typed) {
        //     setCompletedTyping(true)
        //     return;
        // }
        setCompletedTyping(false);
        let i = 0;
        const stringResponse = chatMessages[chatMessages.length - 1].content;
        const intervalId = setInterval(() => {
            setDisplayResponse(stringResponse.slice(0, i));
            i++;
            if (i > stringResponse.length) {
                clearInterval(intervalId);
                setCompletedTyping(true);
            }
        }, 20);
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        return () => clearInterval(intervalId)

    }, [chatMessages])
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [displayResponse]);
    return (
        <div className="max-h-0">
            {
                chatMessages.map((message, messageIndex) => (
                    <div key={messageIndex}>
                        {
                            message?.role === "user" && (
                                <div className="chat chat-end" >

                                    <span className="chat-bubble whitespace-pre-line">
                                        {message?.content}
                                    </span>
                                    <span
                                        className='userPart'
                                    >
                                        {user?.name[0]}
                                    </span>
                                </div>
                            )
                        }
                        {
                            messageIndex === chatMessages.length - 1 &&
                            message?.role === "assistant" && (
                                <div className="chat chat-start" ref={messagesEndRef}>
                                    
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSobT6Nq7W-FJnK5lLapZlwySLwB0W4sKCYDg&s" alt="openai" className='imageGpt'  />
                                    
                                    <span className="chat-bubble whitespace-pre-line">
                                        {displayResponse}
                                        {!completedTyping && <Cursor />}
                                    </span>
                                </div>
                            )
                        }

                        {
                            message?.role === "assistant" &&
                            messageIndex !== chatMessages.length - 1 && (
                                <div className="chat chat-start">
                                   
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSobT6Nq7W-FJnK5lLapZlwySLwB0W4sKCYDg&s" alt="openai" className='imageGpt'  />
                                    
                                    <span className="chat-bubble whitespace-pre-line">
                                        {message?.content}
                                    </span>
                                </div>
                            )
                        }
                    </div>

                ))
            }
            <span ref={messagesEndRef}>  </span>
        </div>
    )

}
export default ChatItem




