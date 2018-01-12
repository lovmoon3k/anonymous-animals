var DB = require('../model/database');
var socketio = require('socket.io');

module.exports.listen = (app) => {
    io = socketio.listen(app);
    io.on('connection', (socket) => {
        console.log("Animal: " + socket.id + " connected!");
        io.sockets.emit("Server-send-message", 'this is message');
    });

    return io;
}
