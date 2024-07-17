import { Box, Button, Typography } from '@mui/material'
import React, { useContext } from 'react'
import CustomisedInput from '../components/CustomisedInput'
import { toast } from "react-hot-toast";
import { IoIosLogIn } from 'react-icons/io'
import axios from 'axios'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const {dispatch, error, loading} = useContext(AuthContext)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email")
        const password = formData.get("password") 
        const name = formData.get("name") 
        try {
            toast.loading("In registering", { id: "login" });
            const res = await axios.post("https://chatgpt-r8cc.onrender.com/api/auth/register", {email, password, name}) 
            if (res.data) {
              navigate("/login")
                toast.success("Account created successfully", { id: "login" });
            }
        } catch (error) {
            dispatch({type: "LOGIN_FAILURE", payload : {message: "Failure to register" }})
            toast.error("Registering in Failed", { id: "login" });
            
        }

    }
    return (
        <Box width={"100%"} height={"100%"} display="flex" flex={1} >
            <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
                <Typography variant="h1"
                    sx={{
                        fontFamily: '"Roboto Slab", serif',
                        fontSize: { xs: '2rem', md: '3rem' },
                        fontWeight: 'bold',
                        marginBottom: 2,
                    }}>
                    Haya Gpt
                </Typography>
            </Box>
            <Box display={"flex"}
                flex={{ xs: 2, md: 1 }}
                justifyContent={"center"}
                alignItems={"center"}
                padding={2}
                ml={"auto"}
                mt={16}
            >
                <form
                    onSubmit={handleSubmit}
                    style={{
                        margin: "auto",
                        padding: "30px",
                        boxShadow: "10px 10px 20px #000",
                        borderRadius: "10px",
                        border: "none",
                    }}
                >
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",

                    }}>
                        <Typography
                            variant="h4"
                            textAlign="center"
                            padding={2}
                            fontWeight={600}>
                            Login
                        </Typography>
                        <CustomisedInput name={"email"} type={"email"} label={"Email"} />
                        <CustomisedInput name={"name"} type={"text"} label={"Name"} />
                        <CustomisedInput name={"password"} type={"password"} label={"Password"} />
                        

                    </Box>
                    <Button
                        type='submit'
                        sx={{
                            px: 2,
                            py: 1,
                            mt: 2,
                            width: "400px",
                            borderRadius: 2,
                            bgcolor: "#00fffc",
                            ":hover": {
                                bgcolor: "white",
                                color: "black",
                            },
                        }}
                        endIcon={<IoIosLogIn />}
                    >
                        Login
                    </Button>

                </form>
            </Box>
        </Box>
    )
}

export default Register
