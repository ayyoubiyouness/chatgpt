import React from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()
  const handleClick = (e) => {
    e.preventDefault()
    navigate('/chat')
  }
  return (
    <Box
      sx={{
        backgroundColor: '#05101c',
        color: 'white',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        my :"auto",
        padding: 3,
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">

        
        <Box
          component="img"
          src="openai.png"
          alt="openai"
          sx={{
            width: {xs: "50px", md: "40px"},
            height: 'auto',
            my : 3

          }}
          className='image-inverted'
        />
        <Typography
          variant="h1"
          sx={{
            fontFamily: '"Roboto Slab", serif',
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 'bold',
            marginBottom: 2,
          }}
        >
          Welcome to HayaGPT
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontFamily: '"Roboto Slab", serif',
            fontSize: { xs: '1rem', md: '1.2rem' },
            marginBottom: 4,
          }}
        >

          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed once, initially
              'Your AI-powered assistant',
              1000,
              'Your Intelligent AI Companion',
              1000,
              'Your Personal AI Chatbot',
              1000,
              'Your Next-Gen AI Helper',
              1000,
            ]}
            speed={60}
            style={{ fontSize: '2em' }}
            repeat={Infinity}
          />
        </Typography>
        <Button
          variant="contained"
          sx={{
            marginTop: 2,
            backgroundColor: '#1a73e8',
            color: 'white',
            '&:hover': {
              backgroundColor: '#1765c3',
            },
          }}
          onClick={handleClick}
        >
          Get Started
        </Button>
        <Grid
          container
          spacing={3}
          sx={{ marginTop: 5 }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              padding: 2,
              backgroundColor: '#1c2a3a',
              borderRadius: 1,
            }}
          >
            <Typography variant="h6">
              Engage in seamless conversations with AI
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              padding: 2,
              backgroundColor: '#1c2a3a',
              borderRadius: 1,
            }}
          >
            <Typography variant="h6">
              Experience cutting-edge AI technology
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
