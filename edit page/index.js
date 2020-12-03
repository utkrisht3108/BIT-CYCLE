function party1() {
  var part1 = document.querySelector(".part1");
  var checkRadio = document.querySelector('input[name="exist"]:checked');
  if (checkRadio != null) {
    part1.classList.remove("hidden");
  }
}
function party2() {
  var part1 = document.querySelector(".part1");
  var checkRadio = document.querySelector('input[name="exist"]:checked');
  console.log(checkRadio);
  if (checkRadio != null) {
    part1.classList.add("hidden");
    document.querySelector('input[name="cycleName"]').value = "";
    document.querySelector('input[name="cycleColor"]').value = "";
    document.querySelector('select[name="boughtIn"]').value = 2011;
    console.log("sad");
  }
}
function party3() {
  var part1 = document.querySelector(".part2");
  var checkRadio = document.querySelector('input[name="exist1"]:checked');
  console.log(checkRadio);
  if (checkRadio != null) {
    part1.classList.remove("hidden");
    console.log("haha");
  }
}
function party4() {
  var part1 = document.querySelector(".part2");
  var checkRadio = document.querySelector('input[name="exist1"]:checked');
  console.log(checkRadio);
  if (checkRadio != null) {
    part1.classList.add("hidden");
    document.querySelector('input[name="cyclePrice"]').value = "";
    document
      .querySelectorAll('input[name="acc"]')
      .forEach((node) => (node.checked = false));
    console.log("sad");
  }
}
var loginuser=localStorage.getItem("user_id");
console.log(loginuser);
show_data();
async function show_data(){
    user=await get_cycles();
    console.log(user);
    document.getElementById("fName").value = user.name;
    document.getElementById("sName").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("phone").value = user.phone;
    document.getElementById("hostel").value = user.hostel;
    document.getElementById("room").value = user.room;
    // document.getElementById("userPhoto").value = user.userImage;
    // document.getElementById("userId").value = user.userId;
    document.getElementById("cycleName").value = user.cycleName;
    document.getElementById("cycleColor").value = user.cycleColor;
    document.getElementById("boughtIn").value = user.boughtIn;
    // document.getElementById("photos").value = user.photos;
    document.getElementById("cyclePrice").value = user.cyclePrice;
    // checkbox ka patanahi
}
async function get_cycles()
 {
    try {
      const res = await fetch('http://localhost:3000/api/users/'+loginuser);
      const respJson = await res.json();
      console.log(respJson);
      if (respJson.status === 'error') {
        throw new Error(respJSON.message);
      }
      return respJson.user;
    }catch (error) {
      alert(error.message);
    }
  }