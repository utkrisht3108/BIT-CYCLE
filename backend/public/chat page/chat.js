const socket = io();

const firstUser = localStorage.getItem('firstUser');
const secondUser = localStorage.getItem('secondUser');


const displayMessage = (message)=>{
  const newMessage = document.createElement('div');
  newMessage.innerHTML = message;
  document.querySelector('body').appendChild(newMessage);
}
console.log('hahahhahah');
socket.emit('load', { firstUser, secondUser });
socket.on('loadOldMessages', (messages) => {
  messages.forEach((message) => {
    const newMessage = document.createElement('div');
    newMessage.innerHTML = message.message;
    document.querySelector('body').appendChild(newMessage);
  });
});
document.querySelector('.chat-form').onsubmit = (e) => {
  e.preventDefault();
  const message = e.target.message.value;
  displayMessage(message);
  socket.emit('chat-message', {
    message,
    sender: firstUser,
    receiver: secondUser,
  });
};
socket.on('received', (message) => {
  console.log(message);
  displayMessage(message.message);
});



//5fb8ba3bbe2f7734546a0fad
//5fbb8df9ca4cb540eced2d4a
