const socket = io();

const firstUser = localStorage.getItem('user_id');
const secondUser = localStorage.getItem('secondUser');


const displayMessage = (message)=>{
  const newMessage = document.createElement('div');
  newMessage.innerHTML = message;
  document.querySelector('body').appendChild(newMessage);
}
window.onload = ()=>{
  socket.emit('load', { firstUser, secondUser });
}
socket.on('displayOldMessages', (response) => {
  localStorage.setItem("conversation",response.conversationId);
  response.oldMessages.forEach((message) => {
    const newMessage = document.createElement('div');
    newMessage.innerHTML = message.message;
    document.querySelector('body').appendChild(newMessage);
  });
});
document.querySelector('.chat-form').onsubmit = (e) => {
  e.preventDefault();
  const message = e.target.message.value;
  displayMessage(message);
  const conId = localStorage.getItem("conversation")
  socket.emit('chat-message', {
    message,
    conId,
    secondUser
  });
};
socket.on('received', (message) => {
  console.log(message);
  displayMessage(message.message);
});



//5fb8ba3bbe2f7734546a0fad
//5fbb8df9ca4cb540eced2d4a
// localStorage.setItem("firstUser")
//5fc3afe4ee3e03f5d4729332
  //5fc3afc25a05aae5268f13b9