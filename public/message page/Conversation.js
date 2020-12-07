export default class Conversation {
  constructor(user) {
    this.user = user;
    this.el = null;
  }

  getElement() {
    if (!this.user.userImage) {
      this.user.userImage = 'default.jpg';
    }
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
                <img src="../img/user/${user.userImage}" alt="" class="img-circle">
                <div class="friend-name conversation">
                    <strong>${user.name}</strong>
                </div>
            </a>
        </div>
        `;
  }

  eventListeners() {
    this.el.querySelector('.conversation').onclick = () => {
      localStorage.setItem('secondUser', this.user._id);
      localStorage.setItem('secondUserName', this.user.name);
      window.location.href = `../chat page/`;
    };
  }
}
