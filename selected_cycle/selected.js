
var y=localStorage.getItem("selected_cycle_id");
var mycycle=document.querySelector("#cycle");

console.log(y);
get_cycles();
async function get_cycles()
 {
    try {
      const res = await fetch('http://localhost:3000/api/cycles/'+y);
      const respJson = await res.json();
      console.log(respJson);
      if (respJson.status === 'error') {
        throw new Error(respJSON.message);
      }
      var cycle=respJson.data.cycle;
      console.log(cycle);
      var temp=gettemp(cycle.brand,cycle.model,cycle.color,cycle.owner);
      var temp_div = document.createElement('div');
      temp_div.innerHTML = temp;
      mycycle.innerHTML="";
      mycycle.appendChild(temp_div);
      rating_update();
    }catch (error) {
      alert(error.message);
    }
  }

var a=1;



function rating_update(){
    var stars=document.querySelectorAll(".rating");
    var i=0;
    for(i=0;i<a;i++){
        stars[i].classList.add("checked");
    }
}
function gettemp(brand,model,color,owner){
    return`
    <div class="cycle-display">
        <div class="cycle-photos">
         <img src="images/kids-ranger-cycle-500x500.jpg" >
        </div>
        <div class="cycle-info">
            <div class="cycle-name"> ${brand}:${model}</div>
            <div class="cycle-rating">            
                <span class="rating fa fa-star "></span>
                <span class="rating fa fa-star "></span>
                <span class="rating fa fa-star "></span>
                <span class="rating fa fa-star"></span>
                <span class="rating fa fa-star"></span>
            </div>
            <div class="cycle-details">
                <h4>Details</h4>
                <li><span class="property">Brand : </span> ${brand}</li>
                <li><span class="property">Model :</span>  ${model}</li>
                <li><span class="property">Colour :</span> ${color}</li>
                <li><span class="property">Brake Type :</span> Disc</li>
                <li><span class="property">Accessories available:</span> Mudgaurd ,Lock</li>
                <h4>Owner</h4>
                <li><span class="property">Name :</span> ${owner.name}</li>
                <li><span class="property">Hostel:</span>10 <span class="property"> Room no. : </span>374</li>
                <li><button class="btn btn-primary">Chat</button></li>
                <h4>User Reviews</h4>

            </div>


        </div>
    </div>
    `;
}