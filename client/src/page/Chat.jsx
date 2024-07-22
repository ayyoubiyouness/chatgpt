import { Avatar, Box, Button, IconButton, StepButton, Typography } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/authContext'
import { red } from '@mui/material/colors'
import ChatItem from '../components/ChatItem'
import { IoMdSend } from 'react-icons/io'
import { sendChatRequest } from '../config/api-request'

const Chat = () => {
  const inputRef = useRef(null)
  const { user, loading } = useContext(AuthContext)
  
  console.log(user)
  const [chatMessages, setChatMessages] = useState([])
 

  const handleSubmit = async () => {
    const content = inputRef.current.value
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage = {role : "user", content}
    setChatMessages((prev) => [...prev, newMessage]);
    console.log(content)
    console.log(user._id)
    const chatData = await sendChatRequest(content)
    console.log(chatData)
    setChatMessages([...chatData])


  }
  
  return (
    <Box sx={{
      display: "flex",
      flex: 1,
      width: "100%",
      height: "100%",
      mt: 3,
      gap: 3,
    }}>
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >



          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}>
            {user?.name[0]}
          </Avatar>
          <Typography
            sx={{
              mx: "auto", fontFamily: "work sans"
            }}>
            You are talking to a ChatBOT
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask some questions related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information
          </Typography>
          <Button
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400
              }
            }}>
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}>
        <Typography
          sx={{
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}>
          Model - GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}>
          {/* {
            chatMessages.map((chat, index) => (
              <ChatItem content={chat.content} role={chat.role} key={index} />
            )


            )
          } */}

          <ChatItem chatMessages={chatMessages} />
          
        </Box>
        <div
          style={{
            width: "100%",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            margin: "auto",
          }}
        >
          <input type="text" ref={inputRef} style={{

            width: "100%",
            backgroundColor: "transparent",
            padding: "30px",
            border: "none",
            outline: "none",
            color: "white",
            fontSize: "20px",
          }} />
          <IconButton sx={{ color: "white", mx: 1 }} onClick={handleSubmit}>
            <IoMdSend />
          </IconButton>

        </div>

      </Box>
    </Box>
  )
}

export default Chat
