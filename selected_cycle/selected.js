
// var y=localStorage.getItem("selected_cycle_id");
var buy_book="";
var mycycle=document.querySelector("#cycle");
console.log(buy_book);
var y="";
window.onload = function () {
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
         tmp = params[i].split('=');
         data[tmp[0]] = tmp[1];
    }
    // document.getElementById('here').innerHTML = data.name;
    console.log(data);
    y=data.id;
    buy_book=data.buybook;
    get_cycles();
}

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
      var access_string="";
      if(cycle.accessories.length==0){
          access_string="None";
      }
      else{
          for(var i=0;i<cycle.accessories.length;i++){
              if(i==0)
              access_string=access_string.concat(cycle.accessories[i]);
              else
              access_string=access_string.concat(",",cycle.accessories[i]);
          }
      }
      console.log(access_string);
      var comment_temp=comments_template(cycle.comments);
      var image_temp=image_template(cycle.images);
      var temp=gettemp(cycle.brand,cycle.model,cycle.color,cycle.owner,access_string,comment_temp,image_temp);
      var temp_div = document.createElement('div');
      temp_div.innerHTML = temp;
      mycycle.innerHTML="";
      mycycle.appendChild(temp_div);
      rating_update();
      var buybtn=document.querySelector(".buy");
      var rentbtn=document.querySelector(".rent");
      if(buy_book=="1")
      rentbtn.classList.add("hidden");
      else
      buybtn.classList.add("hidden");
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
function gettemp(brand,model,color,owner,access_string,comment_temp,image_temp){
    return`
    <div class="cycle-display">
        <div class="cycle-photos">
         ${image_temp}
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
                <li><span class="property">Accessories available:</span> ${access_string}</li>
            </div>
            <div class="owner-details">
                <h4>Owner</h4>
                <li><span class="property">Name :</span> ${owner.name}</li>
                <li><span class="property">Hostel:</span>10 <span class="property"> Room no. : </span>374</li>
                <li><button class="btn btn-primary">Chat</button></li>
            </div>
            <div class="user-reviews">
                <h4>User Reviews</h4>
                ${comment_temp}

            </div>
            <button class="btn btn-warning rent">Rent</button>
            <button class="btn btn-warning buy">Buy</button>

        </div>
    </div>
    `;
}
function comments_template(comments){
    var comment_temp=[];
    if(comments.length==0){
        console.log("lol");
        comment_temp=["None"];
    }
    else{
        comments.forEach(element => {
            
            comment_temp.push(get_comment_template(element));
            
        });
    }
    console.log(comment_temp);
    return comment_temp;

}
function get_comment_template(element){
    return`
    <li><span class="property">${element.user.name} :</span> ${element.comment}</li>
    `;
}

function image_template(images){
    var image_temp=[];
    if(images.length==0){
        console.log("lol");
        image_temp=["None"];
    }
    else{
        images.forEach(element => {
            
            image_temp.push(get_image_template(element));
            
        });
    }
    console.log(image_temp);
    return image_temp;

}
function get_image_template(element){
    return`
    <img src="/IEEE-Megaproject/backend/img/cycle/${element}" >
    `;
}