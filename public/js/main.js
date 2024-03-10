const socket = io();
socket.on('message', message => {
	console.log(message);
	renderMessage(message);
});

const chatForm = document.querySelector('.chat-form');

chatForm.addEventListener('submit', event => {
	event.preventDefault();

	const message = event.target.elements.msg.value;

	// emmit message to the server
	socket.emit('chatMessage', message);
});

// output message to view

function renderMessage(msg) {
	const div = document.createElement('div');
	div.classList.add('message');
	div.innerHTML = `
    <p>${msg}</p>
  `;
	document.querySelector('.chat-message').appendChild(div);
}
