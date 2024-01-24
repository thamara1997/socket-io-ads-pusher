const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require('cors');


const port = 3000;

app.use(express.json());
app.use(cors());

io.on("connection", (socket) => {
  console.log("a user connected");
  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Define the POST endpoint
app.post("/post-ad", (req, res) => {
  const data = req.body;
  console.log("Received data:", data);
  io.emit("broadcastData", data);

  res.status(200).send("Data received and broadcasted");
});

http.listen(port, () => {
  console.log("listening on *:", port);
});
