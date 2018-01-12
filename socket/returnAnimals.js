var socketio = require('socket.io');

module.exports.listen = (app, DB_Animals) => {
    var animalArray = [];

    io = socketio.listen(app);
    io.on('connection', (socket) => {
        
        var randomAnimal = DB_Animals[Math.floor(Math.random() * DB_Animals.length)];

        if (animalArray.length == DB_Animals.length) {
            return false;
        }
        
        while (animalArray.indexOf(randomAnimal.id) != -1) {
            randomAnimal = DB_Animals[Math.floor(Math.random() * DB_Animals.length)];
        }
        animalArray.push(randomAnimal.id);

        console.log("Animal: " + randomAnimal.name + " connected!");
        socket.broadcast.emit("animal-online", {
            animalId: randomAnimal.id,
            animalName: randomAnimal.name,
            animalColor: randomAnimal.color
        });

        socket.on("disconnect", () => {
            console.log("User: " + randomAnimal.name + " disconnected!");
            animalArray.splice(animalArray.indexOf(randomAnimal.id), 1);
            socket.broadcast.emit("animal-offline", randomAnimal.id);
        });

        socket.on('animal-check', (inputId) => {
            var dataCallback = { 
                    inputId: inputId,
                    animalName: randomAnimal.name,
                    animalColor: randomAnimal.color
            };
            socket.broadcast.emit("server-send-check", dataCallback);
        });

        socket.on('animal-uncheck', (inputId) => {
            socket.broadcast.emit("server-send-uncheck", inputId);
        });
    });

    return io;
}
