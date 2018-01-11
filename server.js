const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const fs = require('fs');

app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './views');

var routes = require('./routes/web');
app.use('/', routes);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("Server is running on port: " + port);
});
