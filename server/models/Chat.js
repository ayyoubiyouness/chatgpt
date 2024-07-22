import mongoose from "mongoose"
import { randomUUID } from "crypto";

const ChatSchema = new mongoose.Schema(
    {
      id: {
        type: String,
        default : randomUUID(),
      },
      role: {
        type: String,
        required : true,
        
      },
      content: {
        type: String,
        required: true
      },
    },
    { timestamps: true }
  );
  
  
  export default mongoose.model("Chat", ChatSchema);