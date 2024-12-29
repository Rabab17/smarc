const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const socketIo = require("socket.io");
const http = require("http");
require("dotenv").config();

app.use(
    cors({
      origin: "*",
    })
  );
  
  app.use(express.json());


  app.use("/", (req, res) => {
    res.status(200).json("hello");
  });
  app.use("*", (req, res) => {
    res.status(404).json({ message: "This route does not exist" });
  });
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    connect();
    console.log("Connected to backend ");
  });
  
  const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("connected to booking db");
    } catch (error) {
      console.log(error.message);
    }
  };
  