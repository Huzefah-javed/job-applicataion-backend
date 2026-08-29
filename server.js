import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { dbConnect } from "./config/db.connect.config.js";
import ChatRoom from "./schemas/chatRoom.schema.js";

const app = express();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connect", (socket) => {
  console.log("connected successfully");

  socket.on("joinAllRooms", async ({ userId }) => {
    const chats = await ChatRoom.find({
      $or: [{ clientId: userId }, { contractorId: userId }],
    });

    chats.forEach((chat) => socket.join(chat.roomId.toString()));
    console.log("every room connected  for ", userId);
  });

  socket.on("sendMsg", ({ roomId, message, senderId }) => {
    console.log({ roomId, message, senderId });

    socket.to(roomId).emit("receiveMsg", { message, roomId, senderId });
  });
});

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

await dbConnect();

server.listen(8000, () => {
  console.log("server running at http://localhost:8000");
});
