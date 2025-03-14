import { WebSocketServer } from "ws";
import http from "http";
import fs from "fs";
import path from "path";

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    fs.readFile(path.join(__dirname, "index.html"), "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal server error");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else if (req.url === "/client.js" && req.method === "GET") {
    fs.readFile(path.join(__dirname, "script.js"), "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal server error");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.end(data);
    });
  }
});

const socket = new WebSocketServer({ server });
socket.on("connection", ws => {
  console.log("Client connected");

  ws.on("message", (msg: Buffer) => {
    console.log("Received", msg.toString());

    ws.send("Echo:" + msg.toString());
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.on("error", err => {
    console.log("Client connection error", err);
  });
});

server.listen(8080, () =>
  console.log("Server started on http://localhost:8080")
);
