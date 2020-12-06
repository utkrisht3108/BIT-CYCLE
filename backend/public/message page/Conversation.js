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

  // yaha pe jo return ho vo "row" wali class ke andar ho 
  getTemplate(user) {
    return `
    <div class="col-lg-3 col-md-4 col-sm-6">
            <a href="#" >
                <img src="images/default.jpg" alt="" class="img-circle">
                <div class="friend-name conversation">
                    <strong>${user}</strong>
                </div>
            </a>
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
