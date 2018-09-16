// Import the express module
var express = require('express');

// Import underscore since it provides lots of array functionality
var _ = require('underscore');

// Create an express app
var app = express();

// Array that will store all connections and audience members
var connections = []
var audience = []
var speaker = {}

var title = "Untitled Presentation";

// Wire up the middleware to serve files from a folder
app.use(express.static('./public'))
app.use(express.static('./node_modules/bootstrap/dist'))

// Make the app listen on port 3300
var server = app.listen(3300);
console.log('Polling server is running on port 3300')

// Creating a socker server that listens on the same port
var io = require('socket.io').listen(server);

// Create an event handler that gets fired when there is a 
// connection on the socket. This event handler will add the 
// socket to the connections array
io.sockets.on('connection', (socket) => {
    // When this sock disconnects, fire the below call back function
    // Note: We use socket.once instead of socket.on since the 
    // disconnect event will only get fired once
    socket.once('disconnect', () => {
        // Find the member in the audience array that has the same id as the
        // socket id that got disconnected and remove them from the audience 
        // array. Also broadcast this to all sockets
        var member = _.findWhere(audience, {id: this.id})
        if (member) {
            audience.splice(audience.indexOf(member), 1);
            io.sockets.emit('audience', audience);
        }

        // Find the index of the socket and remove it
        connections.splice(connections.indexOf(socket), 1);

        // Disconnect the socket
        socket.disconnect();
        console.log('Disconnected from socket. %s sockets remaining', connections.length);
    });

    socket.on('join', (payload) => {
        var newMember = {
            id: this.id, // the current socket
            name: payload.name,
            type: 'member', // will be used to differentiate between speaker and members
        }
        audience.push(newMember);
        console.log('Audience joined %s', newMember.name);

        // Send a confirmation event back to the client acknowledging that the 
        // newMember data has been received
        socket.emit('joined', newMember);

        // Update all connected sockets with new audience data by broadcasting 
        // it to all sockets
        console.log('Broadcasting entire audience to all sockets');
        io.sockets.emit('audience', audience);
    });

    socket.on('start', (payload) => {
        speaker.id = this.id;
        speaker.name = payload.name;
        speaker.type = 'speaker';
        title = payload.title;

        // Emit the joined event for the speaker confirming that they have joined
        socket.emit('joined', speaker);
        console.log('Presentation has been started by %s', speaker.name);

        // Broadcast to all clients that the speaker has joined and set the title
        io.sockets.emit('start', {
            title: title,
            speaker: speaker.name,
        });
    });

    // Emit welcome events that will be sent to the client via the socket
    socket.emit('welcome', {
        title: title,
        audience: audience, 
        speaker: speaker.name,
    })

    connections.push(socket);
    console.log('Connected to socket %s. %s sockets connected', socket.id, connections.length)
});
