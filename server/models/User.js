import { randomUUID } from "crypto";
import mongoose from "mongoose"

const ChatSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: randomUUID(),
    },
    role: {
      type: String,
      required: true,

    },
    content: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

const ChatGroupSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: () => randomUUID(),
    },
    chats: [ChatSchema],
  },
  { timestamps: true }
)

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true

    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    img: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    chats: [ChatGroupSchema]


  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);