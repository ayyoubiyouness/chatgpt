import { Avatar, Box, Button, IconButton, List, ListItem, ListItemButton, ListItemText, StepButton, Typography } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/authContext'
import { red } from '@mui/material/colors'
import ChatItem from '../components/ChatItem'
import { IoMdSend } from 'react-icons/io'
import { sendChatRequest } from '../config/api-request'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { IoAddCircle } from "react-icons/io5";

const Chat = () => {
  const inputRef = useRef(null)
  const location = useLocation()
  console.log("this is location")
  const chatbotId = location.pathname.split("/")[2]

  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext)

  console.log(user)
  const [chatMessages, setChatMessages] = useState([])
  const [typed, setTyped] = useState(false)


  
  const handleSubmit = async () => {
    if (!chatbotId) {
      try {
        const chatbotId = await axios.get(`http://localhost:8800/api/chat/new/chatBot/${user._id}`)
        navigate(`/chat/${chatbotId.data}`)
        
      } catch (error) {
        console.log(error)
        
      }
    }
    const content = inputRef.current.value
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage = { role: "user", content }
    setChatMessages((prev) => [...prev, newMessage]);
    const userId = user._id
    const chatData = await sendChatRequest(content, userId, chatbotId)
    console.log(chatData)
    setChatMessages([...chatData])


  }
  useEffect(() => {
    const handleClick = async () => {
      const chatId = chatbotId
      const userId = user._id
      console.log("hello")
      console.log(chatId)
      console.log(userId)
      try {
        const chats = await axios.get(`http://localhost:8800/api/chat/chats/${chatId}/${userId}`)
        setTyped(true)
        setChatMessages(chats.data[0].chats)
        console.log("done")
      } catch (error) {
        console.log(error)

      }
    }
    handleClick()

  }, [location])
  const handleAddChat = () => {
    navigate("/chat")
  }


  const handleClickChat = (e, chat) => {

    console.log("hello from sidebar")
    navigate(`/chat/${chat.id}`)
  }
  console.log(user.chats)

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
            height: "100%",
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


          <Button sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems : "center",
            gap:"5px"

          }}
          onClick={handleAddChat}
          >
            <Typography>New Chat</Typography>
            <IoAddCircle style={{fontSize:"20px", fontWeight:"700" }}/>
          </Button>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 1, p: 3 }}>
            Previous chats
          </Typography>

          <nav aria-label="secondary mailbox folders " style={{ maxHeight: '50%0', overflowY: 'auto' }}>
            <List>
              {
                user.chats.map((chat) => (
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary={chat.chats[0].content} onClick={(e) => handleClickChat(e, chat)} />
                    </ListItemButton>
                  </ListItem>
                ))
              }


            </List>
          </nav>


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

          <ChatItem chatMessages={chatMessages} typed={typed} />

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
