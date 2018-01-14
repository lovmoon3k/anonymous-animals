/**
 * Require module socket.io & Model Animals
 */
var socketio = require('socket.io');
var DB_Animals = require('../models/database');

module.exports.listen = (app) => {
    /**
     * Create an array to contain animals online
     */
    var animalArray = [];

    /**
     * Initialization module io
     */
    io = socketio.listen(app);
    io.on('connection', (socket) => {
        /**
         * Take out a random animal
         */
        var randomAnimal = DB_Animals[Math.floor(Math.random() * DB_Animals.length)];

        /**
         * Check whether the visitor exceeds the animal limit list?
         */
        if (animalArray.length == DB_Animals.length) {
            return false;
        }
        
        /**
         * Check if the selected random animal is repeated or not?
         */
        while (animalArray.indexOf(randomAnimal.id) != -1) {
            randomAnimal = DB_Animals[Math.floor(Math.random() * DB_Animals.length)];
        }

        /**
         * Push this animal's id in to the animals array
         */
        animalArray.push(randomAnimal.id);

        //console.log("Animal: " + randomAnimal.name + " connected!");
        /**
         * Send animal list online to the client
         */
        socket.broadcast.emit("animal-online", {
            animalId: randomAnimal.id,
            animalName: randomAnimal.name,
            animalColor: randomAnimal.color
        });

        /**
         * Listen to an event from client when an animal is offline
         */
        socket.on("disconnect", () => {
            //console.log("User: " + randomAnimal.name + " disconnected!");
            animalArray.splice(animalArray.indexOf(randomAnimal.id), 1);
            socket.broadcast.emit("animal-offline", randomAnimal.id);
        });

        /**
         * Listen to an event from client when an animal clicks the input box
         */
        socket.on('animal-check', (inputId) => {
            var dataCallback = { 
                    inputId: inputId,
                    animalName: randomAnimal.name,
                    animalColor: randomAnimal.color
            };
            socket.broadcast.emit("server-send-check", dataCallback);
        });

        /**
         * Listen to an event from client when an animal leaves the input box
         */
        socket.on('animal-uncheck', (inputId) => {
            socket.broadcast.emit("server-send-uncheck", inputId);
        });
    });

    /**
     * return module io for server
     */
    return io;
}
