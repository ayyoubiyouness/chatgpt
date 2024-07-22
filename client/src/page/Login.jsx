import { Box, Button, Typography } from '@mui/material'
import React, { useContext } from 'react'
import CustomisedInput from '../components/CustomisedInput'
import { toast } from "react-hot-toast";
import { IoIosLogIn } from 'react-icons/io'
import axios from 'axios'
import { AuthContext } from '../context/authContext'

const Login = () => {
    const {dispatch, error, loading} = useContext(AuthContext)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email")
        const password = formData.get("password") 
        try {
            toast.loading("Signing In", { id: "login" });
            const res = await axios.post("http://localhost:8800/api/auth/login", {email, password}) 
            if (res.data) {
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details })
                toast.success("Signed In Successfully", { id: "login" });
            }
        } catch (error) {
            dispatch({type: "LOGIN_FAILURE", payload : {message: "You are not allowed!" }})
            toast.error("Signing In Failed", { id: "login" });
            
        }

    }
    return (
        <Box width={"100%"} height={"100%"} display="flex" flex={1} >
            <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
                <img src='airobot.png' alt='Robot' style={{ width: "400px" }} />
            </Box>
            <Box display={"flex"}
                flex={{ xs: 1, md: 0.5 }}
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

export default Login
