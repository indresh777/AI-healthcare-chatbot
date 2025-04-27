let socket = new WebSocket("wss://yourserver.com/chat");

socket.onmessage = function(event) {
  let message = document.createElement("div");
  message.textContent = event.data;
  document.getElementById("messages").appendChild(message);
};

function sendMessage() {
  let message = document.getElementById("messageInput").value;
  socket.send(message);
  let userMessage = document.createElement("div");
  userMessage.textContent = "You: " + message;
  document.getElementById("messages").appendChild(userMessage);
  document.getElementById("messageInput").value = "";
}
