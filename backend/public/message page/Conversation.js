export default class Conversation {
  constructor(user) {
    this.user = user;
    this.el = null;
  }

  getElement() {
    const temp = this.getTemplate(this.user);
    var temp_div = document.createElement('div');
    temp_div.innerHTML = temp;
    this.el = temp_div.children[0];
    this.eventListeners();
    return this.el;
  }
  getTemplate(user) {
    return `
        <div>
            <divc class="conversation"> User ${user}</div>
        </div>
        `;
  }

  eventListeners() {
    this.el.querySelector('.conversation').onclick = () => {
      localStorage.setItem('secondUser', this.user);
      window.location.href = '../chat page/';
    };
  }
}
