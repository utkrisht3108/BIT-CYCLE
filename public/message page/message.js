import Conversation from './Conversation.js';

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
      if (conv.participants[0] === currUser) {
        conversations.push(conv.participants[1]);
      } else {
        conversations.push(conv.participants[0]);
      }
    });
    conversations = conversations.map((conv) => {
      return new Conversation(conv);
    });
    return conversations;
    console.log(conversations);
  } catch (error) {
    console.log(error);
  }
};
const renderConversations = async () => {
  const conversations = await getConversations();
  conversations.forEach((element) => {
    document.querySelector('body').appendChild(element.getElement());
  });
};


renderConversations().catch((err) => console.log(err));
