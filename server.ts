import { Socket } from "socket.io";
import http from "http"
import express from "express"
import cors from "cors";
const socket = require('socket.io')

const app = express();
const server = http.createServer(app);

const {GenerateValuesController} = require("./GenerateValues");
const io = socket(server, {
  transports: ["websocket"],
});
app.use(cors());

io.on("connection", (socket:Socket) => {
  console.log("user has been connected");
  socket.on("stream", () => {
    const deviceValues = GenerateValuesController().generateValues();
    socket.emit("updateValues", deviceValues);
  });
  socket.on("disconnect", () => {
    console.log("user has been disconnected");
    socket.disconnect();
  });
});

server.listen(8080, "localhost", () => {
  console.log("Server started");
});
