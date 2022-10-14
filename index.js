//packages
const express = require("express");
const corsMiddleWare = require("cors");

//routers
const authRouter = require("./routers/auth");
const productRouter = require("./routers/product");
const categoryRouter = require("./routers/category");
const messageRouter = require("./routers/message");
const { PORT } = require("./config/constants");


// Create an express app
const app = express();

//Socket.io
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");


// CORS middleware:  * Since our api is hosted on a different domain than our client
// we are are doing "Cross Origin Resource Sharing" (cors)
// Cross origin resource sharing is disabled by express by default
app.use(corsMiddleWare());

// express.json() to be able to read request bodies of JSON requests a.k.a. body-parser
app.use(express.json());


//socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"]
  }
});

io.on("connection", (socket) => {
  console.log("client connected:", socket.id)

  socket.on('ping', () => {
    socket.emit('pong', "Hola, esto es lo que estoy emitiendo, pero no se recibe automaticamente ");
  });

  socket.on("disconnect", (reason) => {
    console.log(reason)
  })
})



//routes
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/", messageRouter);
//start listening

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});