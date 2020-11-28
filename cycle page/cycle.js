/* eslint-disable */
export default class Cycle {
    constructor(id, owner, model, comments,available) {
      this.id = id;
      this.owner=owner;
      this.model = model;
      this.el = null;
      this.comments = comments;
      this.available=available;
    }
    getelement() {
      var temp = this.gettemplate(
        this.model
      );
      var temp_div = document.createElement('div');
      temp_div.innerHTML = temp;
      this.el = temp_div.children[0];
      
      return this.el;
    }
    gettemplate(model) {
      return`
      <div class="cycle">
          <div class="cycle-photo">
             <img src="kids-ranger-cycle-500x500.jpg">    
          </div>
          <div class="cycle-model">
              ${model}
          </div>
          <div class="cycle-price">
             10/hr (expected)
          </div>
          <div class="book-button" >
              <button class="btn btn-primary">Book</button>
          </div>
      </div>
      `;
      }
    }
    
  