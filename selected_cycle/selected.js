// var y=localStorage.getItem("selected_cycle_id");
var buy_book = "";
var mycycle = document.querySelector("#cycle");
var y = "";
window.onload = async function () {
  var url = document.location.href,
    params = url.split("?")[1].split("&"),
    data = {},
    tmp;
  for (var i = 0, l = params.length; i < l; i++) {
    tmp = params[i].split("=");
    data[tmp[0]] = tmp[1];
  }
  // document.getElementById('here').innerHTML = data.name;
  y = data.id;
  buy_book = data.buybook;
  const cycle = await get_cycles();
  makeTemplate(cycle);
};

const makeTemplate = (cycle) => {
  var access_string = "";
  if (cycle.accessories.length == 0) {
    access_string = "None";
  } else {
    for (var i = 0; i < cycle.accessories.length; i++) {
      if (i == 0) access_string = access_string.concat(cycle.accessories[i]);
      else access_string = access_string.concat(",", cycle.accessories[i]);
    }
  }
  var comment_temp = comments_template(cycle.comments);
  var image_temp = image_template(cycle.images);
  var image_temp2 = image_template2(cycle.images);
  console.log(image_temp2);
  console.log(image_temp);
  var temp = gettemp(
    cycle.brand,
    cycle.model,
    cycle.color,
    cycle.owner,
    access_string,
    comment_temp,
    image_temp,
    image_temp2
  );
  var temp_div = document.createElement("div");
  temp_div.innerHTML = temp;
  mycycle.innerHTML = "";
  mycycle.appendChild(temp_div);
  rating_update();
  var buybtn = document.querySelector(".buy");
  var rentbtn = document.querySelector(".rent");
  var rentdates = document.querySelector(".rent-cycle");
  if (buy_book == "1") {
    rentbtn.classList.add("hidden");
    rentdates.classList.add("hidden");
  } else buybtn.classList.add("hidden");
  rentbtn.onclick = async () => {
    try {
      const from = document.getElementById("from").value;
      const till = document.getElementById("till").value;
      if (!from || !till) {
        throw new Error("Kindly Enter start and end dates");
      }
      const currentUser = localStorage.getItem("user_id");
      if (!currentUser) {
        throw new Error("Kindly Login");
      }
      const ownerId = cycle.owner._id;
      if (ownerId === currentUser) {
        throw new Error("Cannot rent your own cycle");
      }
      console.log(cycle);
      console.log(from, till);
      const resp = await fetch("http://localhost:3000/api/rent", {
        method: "POST",
        body: JSON.stringify({
          from,
          till,
          renterId: currentUser,
          ownerId,
          cycleId: cycle._id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const respJson = await resp.json();
      console.log(respJson);
    } catch (err) {
      console.log(err);
    }
  };
};
async function get_cycles() {
  try {
    const res = await fetch("http://localhost:3000/api/cycles/" + y);
    const respJson = await res.json();
    console.log(respJson);
    if (respJson.status === "error") {
      throw new Error(respJSON.message);
    }
    var cycle = respJson.data.cycle;
    return cycle;
  } catch (error) {
    alert(error.message);
  }
}

console.log(document.querySelector(".rent"));

var a = 1;

function rating_update() {
  var stars = document.querySelectorAll(".rating");
  var i = 0;
  for (i = 0; i < a; i++) {
    stars[i].classList.add("checked");
  }
}
function gettemp(
  brand,
  model,
  color,
  owner,
  access_string,
  comment_temp,
  image_temp,
  image_temp2
) {
  return `
    <div class="cycle-display">
        <div class="cycle-photos">
        <div id="ut" class="carousel slide" data-ride="carousel" data-pause="hover">
        <ol class="carousel-indicators">
            ${image_temp2}
        </ol>
        <div class="carousel-inner">
            ${image_temp}
        </div>
        <a class="carousel-control-prev" href="#ut" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#ut" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div> 
                    

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
            <div class="rent-cycle abcd">
                <h4>Select Date and Time for your Booking</h4>
                <label for="" class="rent-dates">From (date and time) :</label><br>
                <input type="datetime-local" id="from" name="">
                <input class="btn btn-danger" type="submit"></input><br><br>
                <label for="" class="rent-dates">Till (date and time) :</label><br>
                <input type="datetime-local" id="till" name="">
                <input class="btn btn-danger" type="submit"></input>
            </div>
            <button class="btn btn-warning btn-block btn-lg rent neeche">Rent</button>
            <button class="btn btn-warning btn-block btn-lg buy neeche">Buy</button>

        </div>
    </div>
    `;
}
function comments_template(comments) {
  var comment_temp = [];
  if (comments.length == 0) {
    console.log("lol");
    comment_temp = ["None"];
  } else {
    comments.forEach((element) => {
      comment_temp.push(get_comment_template(element));
    });
  }
  console.log(comment_temp);
  return comment_temp;
}
function get_comment_template(element) {
  return `
    <li><span class="property">${element.user.name} :</span> ${element.comment}</li>
    `;
}

function image_template(images) {
  var image_temp = [];
  var i = 0;
  if (images.length == 0) {
    console.log("lol");
    image_temp.push(`
        <div class="carousel-item active">
            <img class="photu" src="../backend/img/cycle/b45d18c2d27a383e95d03bf5ddfe469c.jpg" >
        </div>
        `);
  } else {
    images.forEach((element) => {
      image_temp.push(get_image_template(element, i));
      i++;
    });
  }
  console.log(image_temp);
  return image_temp;
}
function image_template2(images) {
  var image_temp2 = [];
  var i = 0;
  if (images.length == 0) {
    console.log("lol");
    image_temp = ["None"];
  } else {
    images.forEach((element) => {
      image_temp2.push(get_image_template2(element, i));
      i++;
    });
  }
  console.log(image_temp2);
  return image_temp2;
}
function get_image_template(element, i) {
  if (i == 0) {
    console.log("lol");
    return `
    <div class="carousel-item active">
        <img class="photu" src="../backend/img/cycle/${element}" >
    </div>
    `;
  }
  return `
    <div class="carousel-item">
        <img class="photu" src="../backend/img/cycle/${element}" >
    </div>
    `;
}
function get_image_template2(element, i) {
  if (i == 0) {
    console.log("lol");
    return `
    <li data-target="#ut" data-slide-to="${i}" class="active"></li>
    `;
  }
  return `
    <li data-target="#ut" data-slide-to="${i}" ></li>
    `;
}
