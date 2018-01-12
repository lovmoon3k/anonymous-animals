var socket = io("http://localhost:3000");

socket.on("Server-send-message", function (data) {
    console.log(data);
});
