const express =require('express');
const app=express();
var http = require("http");
const dotenv=require('dotenv');
var server = http.createServer(app);
var io = require("socket.io")(server);
dotenv.config();
app.use(express.json());
const router=require("./Router/router");
app.use(router);
app.use("/uploads/",express.static('uploads'));
const mongoose=require('mongoose');
var clients = {};

io.on("connection", (socket) => {
  console.log("connetetd");
  console.log(socket.id, "has joined");
  socket.on("signin", (id) => {
    console.log(id);
    clients[id] = socket;
    console.log(clients);
  });
  socket.on("message", (msg) => {
    console.log(msg);
    let targetId = msg.targetId;
    if (clients[targetId]) clients[targetId].emit("message", msg);
  });
});

server.listen(process.env.PORT,()=>{
    console.log(`your are using the port :${process.env.PORT}`)
})

mongoose.connect(process.env.DB_URL,{},(err)=>{
    if(err){
        console.log(err+"not connected");
    }else{
        console.log("connected");
    }
});
