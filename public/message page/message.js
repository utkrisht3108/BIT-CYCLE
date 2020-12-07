import Conversation from './Conversation.js';

if (localStorage.getItem('loggedIn') !== 'true') {
  window.location.href = '../landing page';
}
const getConversations = async () => {
  try {
    const currUser = localStorage.getItem('user_id');
    if (!currUser) {
      throw new Error('Kindly Log in');
    }
    const resp = await fetch(`/api/conversations/${currUser}`);
    const respJson = await resp.json();
    let conversations = [];
    respJson.conversations.forEach((conv) => {
      if (conv.participants[0]._id === currUser) {
        if (conv.participants[1]) conversations.push(conv.participants[1]);
      } else {
        if (conv.participants[0]) conversations.push(conv.participants[0]);
      }
    });
    conversations = conversations.map((conv) => {
      console.log(!conv);
      if (conv) {
        console.log('hahahh');
        return new Conversation(conv);
      }
    });
    console.log(conversations);
    return conversations;
    console.log(conversations);
  } catch (error) {
    console.log(error);
  }
};
const renderConversations = async () => {
  const conversations = await getConversations();
  conversations.forEach((element) => {
    document.querySelector('.row').appendChild(element.getElement());
  });
};

renderConversations().catch((err) => console.log(err));
