const socket = io();

if (localStorage.getItem('loggedIn') !== 'true') {
  window.location.href = '../landing page';
}

const firstUser = localStorage.getItem('user_id');
const secondUser = localStorage.getItem('secondUser');
const secondUserName = document.createElement('div');
secondUserName.innerHTML = localStorage.getItem('secondUserName');
secondUserName.classList.add('userName');
document.querySelector('.sender-name').appendChild(secondUserName);
var my_chat = document.querySelector('#my-chat');
function displayMyMessage(message, time) {
  console.log('lol');
  var newMessage = document.createElement('div');
  var d = new Date(time);
  console.log(d.toString().substring(4, 21));
  temp = `
      <div class="my-message">
          <div class="my-message-content">${message} </div>
          <div class="my-message-time">${d.toString().substring(4, 21)} </div>
        </div>
        `;
  newMessage.innerHTML = temp;
  my_chat.appendChild(newMessage);
}
function displayUserMessage(message, time) {
  var newMessage = document.createElement('div');
  var d = new Date(time);
  console.log(d.toString().substring(4, 21));
  temp = `
  <div class="sender-message">
  <div class="sender-message-content">${message}</div>
  <div class="sender-message-time">${d.toString().substring(4, 21)}</div>
  </div>
        `;
  newMessage.innerHTML = temp;
  my_chat.appendChild(newMessage);
}
const displayMessage = (message) => {
  const newMessage = document.createElement('div');
  newMessage.innerHTML = message;
  document.querySelector('body').appendChild(newMessage);
};
socket.emit('load', { firstUser, secondUser });
socket.on('displayOldMessages', (response) => {
  localStorage.setItem('conversation', response.conversationId);
  response.oldMessages.forEach((message) => {
    console.log(message);
    if (message.receiver == firstUser) {
      displayUserMessage(message.message, message.time);
    }
    if (message.receiver == secondUser) {
      displayMyMessage(message.message, message.time);
    }
    // const newMessage = document.createElement('div');
    // newMessage.innerHTML = message.message;
    // document.querySelector('body').appendChild(newMessage);
  });
});
document.querySelector('.chat-form').onsubmit = (e) => {
  e.preventDefault();
  const message = e.target.message.value;
  e.target.message.value = '';
  displayMyMessage(message, Date.now());
  const conId = localStorage.getItem('conversation');
  socket.emit('chat-message', {
    message,
    conId,
    secondUser,
  });
};
socket.on('received', (message) => {
  console.log(message);
  displayUserMessage(message.message, message.time);
});

//5fb8ba3bbe2f7734546a0fad
//5fbb8df9ca4cb540eced2d4a
// localStorage.setItem("firstUser")
//5fc3afe4ee3e03f5d4729332
//5fc3afc25a05aae5268f13b9
