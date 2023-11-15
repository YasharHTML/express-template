import express from "express";

const app = express();

app.get("/ping", (req, res) => {
  res.json({
    message: "pong",
    pid: process.pid,
  });
});

export { app };
