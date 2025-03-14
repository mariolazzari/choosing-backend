"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const server = http_1.default.createServer((req, res) => {
    if (req.url === "/" && req.method === "GET") {
        fs_1.default.readFile(path_1.default.join(__dirname, "index.html"), "utf-8", (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Internal server error");
                return;
            }
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });
    }
    else if (req.url === "/client.js" && req.method === "GET") {
        fs_1.default.readFile(path_1.default.join(__dirname, "script.js"), "utf-8", (err, data) => {
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
const socket = new ws_1.WebSocketServer({ server });
socket.on("connection", ws => {
    console.log("Client connected");
    ws.on("message", (msg) => {
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
server.listen(8080, () => console.log("Server started on http://localhost:8080"));
