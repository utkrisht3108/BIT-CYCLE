import Transaction from './transaction.js';

if (localStorage.getItem('loggedIn') !== 'true') {
  window.location.href = '../landing page';
}

var loginuser = localStorage.getItem('user_id');
var transaction_arr = [];
var myaccount = document.querySelector('#myaccount');
console.log(loginuser);
show_data();
// var stars=document.querySelectorAll(".cycle-rating-input");
// console.log(stars);
// stars.forEach((element)=>{
//   element.oninput=()=>{
//     console.log(element.value);
//   }
// })
async function show_data() {
  var user = await get_user();
  await get_transactions();
  console.log(user);
  var temp = gettemplate(
    user.user.name,
    user.user.email,
    user.user.hostel,
    user.user.room
  );
  var temp_div = document.createElement('div');
  temp_div.innerHTML = temp;
  myaccount.innerHTML = '';
  myaccount.appendChild(temp_div);
  if (transaction_arr.length == 0) {
    myaccount.innerHTML +=
      "<div class='transaction-display'><h4>No transactions</h4></div>";
  } else {
    transaction_arr.forEach((element) => {
      myaccount.appendChild(element.getelement());
    });
  }
}
async function get_user() {
  try {
    const res = await fetch('/api/users/' + loginuser);
    const respJson = await res.json();
    console.log(respJson);
    if (respJson.status === 'error') {
      throw new Error(respJSON.message);
    }
    return respJson;
  } catch (error) {
    alert(error.message);
  }
}
async function get_transactions() {
  try {
    const res = await fetch('/api/transactions/' + loginuser);
    const respJson = await res.json();
    console.log(respJson);
    if (respJson.status === 'error') {
      throw new Error(respJSON.message);
    }
    console.log(respJson);
    // return respJson.transactions;
    respJson.transactions.forEach((element) => {
      transaction_arr.push(
        new Transaction(
          element._id,
          element.txnType,
          element.owner,
          element.otherParty,
          element.cycle,
          element.renterfeedback,
          element.ownerName,
          element.otherPartyName,
          element.ownerfeedback,
          element.cycleDetails
        )
      );
    });
    console.log(transaction_arr);
  } catch (error) {
    alert(error.message);
  }
}
function gettemplate(name, email, hostel, room) {
  return `
      <div class="myaccount-display">
               <div class="user-photo">
                   <img src="sasur.jpeg">
               </div>
               <div class="user-display">
                   <div class="user-details">
                        <h2>User-Info</h2>
                        <li><span class="property">Name : </span> ${name}</li>
                        <li><span class="property">Hostel : </span> ${hostel}<span class="property">  Room No. : </span>${room}</li>
                        <li><span class="property">Email-Id : </span> ${email}</li>
                        <li><span class="property">Phone Number : </span> 1010101010</li>
                    </div>
                </div>
           </div>
           <div id="transaction-header"><h2>Your Transactions</h2></div>
      `;
}
