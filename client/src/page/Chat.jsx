import { Avatar, Box, Button, IconButton, List, ListItem, ListItemButton, ListItemText, StepButton, Typography } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/authContext'
import { blue, red } from '@mui/material/colors'
import ChatItem from '../components/ChatItem'
import { IoMdSend } from 'react-icons/io'
import { sendChatRequest } from '../config/api-request'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { IoAddCircle } from "react-icons/io5";

const Chat = () => {
  const inputRef = useRef(null)
  const location = useLocation()
  const [chatMessages, setChatMessages] = useState([])
  const chatbotId = location.pathname.split("/")[2]
  
  const [chatBotCredential, setChatBotCredential] = useState(chatbotId)

  const [typed, setTyped] = useState(false)
  const { user, loading } = useContext(AuthContext)

  const navigate = useNavigate();


  const handleSubmit = async () => {
    try {
      let currentChatBotCredential = chatBotCredential;
      if (!chatBotCredential) {
        const response = await axios.get(`https://chatgpt-r8cc.onrender.com/api/chat/new/chatBot/${user._id}`);
        currentChatBotCredential = response.data;
        setChatBotCredential(currentChatBotCredential);
        // Wait for state update to complete
        await new Promise(resolve => setTimeout(resolve, 0));

      }


      const content = inputRef.current.value;
      if (inputRef && inputRef.current) {
        inputRef.current.value = "";
      }
      const newMessage = { role: "user", content };
      setChatMessages((prev) => [...prev, newMessage]);
      const userId = user._id;
      console.log("this is the currentChatBotCredential")
      console.log(currentChatBotCredential)
      const chatData = await sendChatRequest(content, userId, currentChatBotCredential);



      setChatMessages([...chatData]);
      navigate(`/chat/${currentChatBotCredential}`);
    } catch (error) {
      console.log(error);
    }
  };






  useEffect(() => {
    const handleClick = async () => {
      const chatId = chatbotId
      const userId = user._id

      try {
        const chats = await axios.get(`https://chatgpt-r8cc.onrender.com/api/chat/chats/${chatId}/${userId}`)
        setTyped(true)
        setChatMessages(chats.data[0].chats)

      } catch (error) {
        console.log(error)

      }
    }
    handleClick()

  }, [location])
  const handleAddChat = () => {
    setChatMessages([])
    navigate("/chat")
  }


  const handleClickChat = (e, chat) => {
   
    setChatBotCredential(chat.id)
    navigate(`/chat/${chat.id}`)
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
          <Button
            sx={{
              width: "200px",
              my: 2,
              color: "white",
              fontWeight: "500",
              fontSize: "20px",
              borderRadius: 3,
              mx: "auto",
              bgcolor: blue[900],
              ":hover": {
                bgcolor: blue.A700
              }
            }}
            onClick={handleAddChat}
          >
            New Chat <IoAddCircle style={{ fontSize: "30px", fontWeight: "700", margin: "3px" }} />
          </Button>


          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 1, p: 2 }}>
            Previous chats
          </Typography>

          <nav aria-label="secondary mailbox folders " style={{ maxHeight: '70%', overflowY: 'auto', margin :2}}>
            <List>
              {
                user.chats.map((chat) => (
                  <ListItem disablePadding>
                    <ListItemButton sx={{bgcolor: "#05101c", borderRadius: 3, my : 0.5}}>
                      <ListItemText primary={chat.chats[0].content} onClick={(e) => handleClickChat(e, chat)} />
                    </ListItemButton>
                  </ListItem>
                ))
              }


            </List>
          </nav>



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
          Haya GPT 3.5 Turbo
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
