const socket = io();
localStorage.setItem('firstUser', '5fb8ba3bbe2f7734546a0fad');
localStorage.setItem('secondUser', '5fbb8df9ca4cb540eced2d4a');
const firstUser = localStorage.getItem('firstUser');
const secondUser = localStorage.getItem('secondUser');
console.log('hahahhahah');
socket.on('connected', () => {
  console.log('sanchiiiiiit');
  socket.emit('load', { firstUser, secondUser });
});
socket.on('loadOldMessages', (messages) => {
  console.log(messages);
  messages.forEach((message) => {
    const newMessage = document.createElement('div');
    newMessage.innerHTML = message.message;
    document.querySelector('body').appendChild(newMessage);
  });
});
document.querySelector('.chat-form').onsubmit = (e) => {
  e.preventDefault();
  const message = e.target.message.value;
  console.log(message);
  socket.emit('chat-message', {
    message,
    sender: firstUser,
    receiver: secondUser,
  });
};
socket.on('received', (message) => {
  console.log(message);
  const newMessage = document.createElement('div');
  newMessage.innerHTML = message.message;
  document.querySelector('body').appendChild(newMessage);
});

//5fb8ba3bbe2f7734546a0fad
//5fbb8df9ca4cb540eced2d4a
