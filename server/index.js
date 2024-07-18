import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser";

import chatRoute from './routes/chat.js'
import userRoute from './routes/user.js'
import authRoute from './routes/auth.js'

const app = express()
dotenv.config()


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to mongoDB")
        
    } catch (error) {
        throw error
    }
}
mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected")
})

app.use(express.json());
app.use(cors());
app.use(cookieParser())
app.use("/api/chat", chatRoute)
app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)


app.get("/test", (req, res) => {
    return res.status(200).json("hrllo world")
})


app.listen(8800, ()=> {
    connect()
    console.log("connected to bakcend")
})