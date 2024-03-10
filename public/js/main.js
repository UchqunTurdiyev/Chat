const socket = io();
socket.on('message', message => {
	console.log(message);
	renderMessage(message);
});

const chatForm = document.querySelector('.chat-form');
const chatMessages = document.querySelector('.chat_massages_container');

chatForm.addEventListener('submit', event => {
	event.preventDefault();

	const message = event.target.elements.msg.value;

	// emmit message to the server
	socket.emit('chatMessage', message);

	//scroll down out

	chatMessages.scrollTop = chatMessages.scrollHeight;

	// clear input
	event.target.elements.msg.value = '';
	event.target.elements.msg.focus();
});

// output message to view

function renderMessage(msg) {
	const div = document.createElement('div');
	div.classList.add('message');
	div.innerHTML = `
	<div>
	<p>${msg.username}</p>
    <p>${msg.text}</p>
		<p>${msg.time}</p>
		</div>
  `;
	document.querySelector('.chat-message').appendChild(div);
}
