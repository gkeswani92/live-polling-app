// Import the express module
var express = require('express');

// Create an express app
var app = express();

// Wire up the middleware to serve files from a folder
app.use(express.static('./public'))
app.use(express.static('./node_modules/bootstrap/dist'))

// Make the app listen on port 3300
var server = app.listen(3300);
console.log('Polling server is running on port 3300')

// Creating a socker server that listens on the same port
var io = require('socket.io').listen(server);

// Create an event handler that gets fired when there is a 
// connection on the socket
io.sockets.on('connection', (socket) => {
    console.log('Connected %s', socket.id)
});
