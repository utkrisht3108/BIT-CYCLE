/* eslint-disable */
var loginuser=localStorage.getItem("user_id");
export default class Transaction {
    constructor(id,type,ownerid, costumerid, cycle,renterfeedback,owner,costumer,ownerfeedback,cycleDetails) {
      this.id=id;
      this.type = type;
      this.ownerid=ownerid;
      this.costumerid = costumerid;
      this.owner=owner;
      this.costumer = costumer;
      this.el = null;
      this.cycle = cycle;
      this.renterfeedback=renterfeedback;
      this.ownerfeedback=ownerfeedback;
      this.cycleDetails=cycleDetails;
    }
    getelement() {
      var cycleName="";
      if(this.cycleDetails){
        cycleName=this.cycleDetails.brand+" : "+this.cycleDetails.model;
        console.log(cycleName);
      }
      else{
        cycleName="Cycle no longer exist in database";
      }
      var yourfeedback;
      if(loginuser==this.ownerid){
        yourfeedback=this.ownerfeedback;
      }
      else{
        yourfeedback=this.renterfeedback;
      }
      console.log(yourfeedback);
      var temp = this.gettemplate(cycleName,yourfeedback);
      var temp_div = document.createElement('div');
      temp_div.innerHTML = temp;
      this.el = temp_div.children[0];
      this.eventlisterners(yourfeedback);
      return this.el;
    }
    gettemplate(cycleName,yourfeedback) {
        if(this.type=="rent" && yourfeedback==false){
            return`
      <div class="transaction-display">
               <div class="transaction-details">
                <li><span class="property">Transaction Type : </span> ${this.type} </li>
                <li><span class="property">Owner : </span> ${this.owner} </li>
                <li><span class="property">Costumer : </span> ${this.costumer} </li>
                <li><span class="property">Cycle : </span> ${cycleName} </li>
                <div class="feedback-trans">
                  <button class="btn btn-primary deal-done">Deal Complete</button>     <span><button class="btn btn-primary deal-canc">Deal Cancelled</button></span>
                  <div class="rating-feedback">
                    <div class="cycle-rating">   
                      <input type="radio" name="rating" class="cycle-rating-input" id="star-5" value="5"><label for="star-5" ></label>
                      <input type="radio" name="rating" class="cycle-rating-input" id="star-4" value="4"><label for="star-4" ></label>
                      <input type="radio" name="rating" class="cycle-rating-input" id="star-3" value="3"><label for="star-3" ></label>
                      <input type="radio" name="rating" class="cycle-rating-input" id="star-2" value="2"><label for="star-2" ></label>
                      <input type="radio" name="rating" class="cycle-rating-input" id="star-1" value="1"><label for="star-1" ></label>    
                    </div>
                    <button class="btn btn-warning send-feed">Send Feedback</button>
                  </div>
                </div>
                

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
                <li><span class="property">Cycle : </span> ${cycleName} </li>
            </div>
             `;
        }
     
      }
      eventlisterners(yourfeedback){
          if(this.type=="rent" && yourfeedback==false){
            var rating=3;
            var stars=this.el.querySelectorAll(".cycle-rating-input");
            console.log(stars);
            stars.forEach((element)=>{
              element.oninput=()=>{
                rating=element.value;
                console.log(element.value);
              }
            })
            var dealdone=this.el.querySelector(".deal-done");
            dealdone.onclick= async()=>{
              if(loginuser==this.costumerid){
                var rating_feed=this.el.querySelector(".rating-feedback");
                rating_feed.style.display="initial";
                var send_feed=this.el.querySelector(".send-feed");
                send_feed.onclick= async()=>{
                  const transactionUpdate = await fetch(`/api/transactions/${this.id}`, {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      renterfeedback: true,
                      rating: rating,

                    }),
                  });
                  const transactionUpdateJson = await transactionUpdate.json();
                  if (transactionUpdate.status !== 200) {
                    throw new Error(transactionUpdateJson.message);
                  }
                  window.location.reload();

                }
              }
              else{
                const transactionUpdate = await fetch(`/api/transactions/${this.id}`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    ownerfeedback: true,
                  }),
                });
                const transactionUpdateJson = await transactionUpdate.json();
                if (transactionUpdate.status !== 200) {
                  throw new Error(transactionUpdateJson.message);
                }
                window.location.reload();
              }
              
              console.log("dealdone");
            }
            var dealcanc=this.el.querySelector(".deal-canc");
            dealcanc.onclick= async()=>{
              const tranDel = await fetch(`/api/transactions/${this.id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              const tranDelJson = await tranDel.json();
              if (tranDel.status !== 200) {
                throw new Error(tranDelJson.message);
              }
              window.location.reload();
              console.log("dealcanc");

            }

          }  
      }
    }
    
  