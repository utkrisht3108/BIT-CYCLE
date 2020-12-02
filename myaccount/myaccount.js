var loginuser=localStorage.getItem("user_id");
var myaccount=document.querySelector("#myaccount");
console.log(loginuser);
show_data();
async function show_data(){
    user=await get_cycles();
    console.log(user);
    temp=gettemplate(user.user.name,user.user.email);
    var temp_div = document.createElement('div');
    temp_div.innerHTML = temp;
    myaccount.innerHTML="";
    myaccount.appendChild(temp_div);
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
      return respJson;
    }catch (error) {
      alert(error.message);
    }
  }
  function gettemplate(name,email){
      return`
      <div class="myaccount-display">
               <div class="user-photo">
                   <img src="sasur.jpeg">
               </div>
               <div class="user-display">
                   <div class="user-details">
                        <h2>User-Info</h2>
                        <li><span class="property">Name : </span> ${name}</li>
                        <li><span class="property">Hostel : </span> 10<span class="property">  Room No. : </span>374</li>
                        <li><span class="property">Email-Id : </span> ${email}</li>
                        <li><span class="property">Phone Number : </span> 1010101010</li>
                    </div>
                </div>
           </div>
      `;
  }