const express = require('express');
const path = require('path');
const app = express();
const socetio = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socetio(server);

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
	socket.emit('message', 'Welcome to the chat app');

	socket.broadcast.emit('message', 'New user joined to the chat');

	socket.on('disconnect', () => {
		io.emit('message', 'left the chat');
	});
	//listen to chat message event
	socket.on('chatMessage', message => {
		io.emit('message', message);
	});
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
