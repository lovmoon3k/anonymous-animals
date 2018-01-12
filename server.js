const express = require('express');
const app = express();
const server = require('http').createServer(app);

app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './views');

var routes = require('./routes/web');
app.use('/', routes);

var io = require('./socket/returnAnimals').listen(server);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("Server is running on port: " + port);
});
