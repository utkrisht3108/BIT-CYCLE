/* eslint-disable */
var loginuser=localStorage.getItem("user_id");
export default class Transaction {
    constructor(type,owner, costumer, cycle,renterfeedback) {
      this.type = type;
      this.owner=owner;
      this.costumer = costumer;
      this.el = null;
      this.cycle = cycle;
      this.renterfeedback=renterfeedback;
    }
    getelement() {
      var temp = this.gettemplate();
      var temp_div = document.createElement('div');
      temp_div.innerHTML = temp;
      this.el = temp_div.children[0];
      this.eventlisterners();
      return this.el;
    }
    gettemplate() {
        if(this.type=="rent" && this.renterfeedback==false && this.costumer==loginuser){
            return`
      <div class="transaction-display">
               <div class="transaction-details">
                <li><span class="property">Transaction Type : </span> ${this.type} </li>
                <li><span class="property">Owner : </span> ${this.owner} </li>
                <li><span class="property">Costumer : </span> ${this.costumer} </li>
                <li><span class="property">Cycle : </span> ${this.cycle} </li>
                <div class="cycle-rating">   
                    <input type="radio" name="rating" class="cycle-rating-input" id="star-5" value="5"><label for="star-5" ></label>
                    <input type="radio" name="rating" class="cycle-rating-input" id="star-4" value="4"><label for="star-4" ></label>
                    <input type="radio" name="rating" class="cycle-rating-input" id="star-3" value="3"><label for="star-3" ></label>
                    <input type="radio" name="rating" class="cycle-rating-input" id="star-2" value="2"><label for="star-2" ></label>
                    <input type="radio" name="rating" class="cycle-rating-input" id="star-1" value="1"><label for="star-1" ></label>    
                </div>
                <button class="btn btn-warning">Send Feedback</button>
                

               </div>
           </div>
      `;

        }
        else{
            return`
            <div class="transaction-display">
               <div class="transaction-details">
                <li><span class="property">Transaction Type : </span> ${this.type} </li>
                <li><span class="property">Owner : </span> ${this.owner} </li>
                <li><span class="property">Costumer : </span> ${this.costumer} </li>
                <li><span class="property">Cycle : </span> ${this.cycle} </li>
            </div>
             `;
        }
     
      }
      eventlisterners(){
          if(this.type=="rent" && this.renterfeedback==false && this.costumer==loginuser){
            var stars=this.el.querySelectorAll(".cycle-rating-input");
            console.log(stars);
            stars.forEach((element)=>{
              element.oninput=()=>{
                console.log(element.value);
              }
            })

          }  
      }
    }
    
  