const socket = new WebSocket(":8080");

socket.addEventListener("open", () => {
  console.log("Client connected");
  socket.send("Hello from client");
});

socket.addEventListener("message", e => {
  console.log("Message from server", e.data);
});

socket.addEventListener("close", () => {
  console.log("Client disconnected from server");
});

socket.addEventListener("error", err => {
  console.log("WebSocket error", err);
});

setInterval(() => {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send("Ping from client");
  }
}, 5000);
