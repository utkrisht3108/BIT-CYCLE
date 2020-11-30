import Cycle from './cycle.js';

var cycle_arr = [];                //array of cycles(class)
var brands =[];
var i=0;
var filter_brands= [];
var filter_access=[];
var cycle_box =document.querySelector("#all-cycles");
var check_boxes=document.querySelectorAll(".checks");
brand_filter();
function brand_filter(){
  console.log(check_boxes);
  check_boxes.forEach((check_box) => {
    check_box.onclick = () =>{
      if(check_box.checked===true){
        if(check_box.classList.contains("brand-check")){
          console.log("lolll");
          filter_brands.push(check_box.value);
        }
        if(check_box.classList.contains("access-check")){
          console.log("lolll");
          filter_access.push(check_box.value);
        }
        filtered_render();
      }
      else{
        if(check_box.classList.contains("brand-check")){
          console.log("lolll");
          var a= filter_brands.indexOf(check_box.value);
          filter_brands.splice(a,1);
        }
        if(check_box.classList.contains("access-check")){
          console.log("lolll");
          var a= filter_access.indexOf(check_box.value);
          filter_access.splice(a,1);
        }
        
        filtered_render();
      }
    };
  });
}

render_cycles();


function filtered_render(){
  cycle_box.innerHTML="";
  var c=0
  console.log(filter_brands);
  console.log(filter_access);
  if(filter_brands.length==0){
    cycle_arr.forEach((element) => {
      console.log(element.brand);
      if(filter_access.some(r=> element.accessories.indexOf(r)>-1)){
        c++;
        cycle_box.appendChild(element.getelement());
      } 
    });

  }
  else if(filter_access.length==0){
    cycle_arr.forEach((element) => {
      console.log(element.brand);
      if(filter_brands.indexOf(element.brand)>-1){
        c++;
        cycle_box.appendChild(element.getelement());
      } 
    });
  }
  else{
    cycle_arr.forEach((element) => {
      console.log(element.brand);
      if(filter_brands.indexOf(element.brand)>-1 && filter_access.some(r=> element.accessories.indexOf(r)>-1)){
        c++;
        cycle_box.appendChild(element.getelement());
      } 
    });

  }
  if(c==0){
    cycle_box.innerHTML="...<h2>No cycle found</h2>....";
  }
  if(filter_brands.length==0 &&filter_access.length==0){
    cycle_box.innerHTML="";
    cycle_arr.forEach((element) => {
      // temp=element.getelement();
      cycle_box.appendChild(element.getelement());
    });
  }
}

async function render_cycles()
{
  await get_cycles();
  cycle_arr.forEach((element) => {
    // temp=element.getelement();
    cycle_box.appendChild(element.getelement());
  });


}
// get_cycles();
async function get_cycles()
 {
    try {
      const res = await fetch('http://localhost:3000/api/cycles');
      const respJson = await res.json();
      console.log(respJson);
      if (respJson.status === 'error') {
        throw new Error(respJSON.message);
      }

      respJson.data.cycle.forEach((element) => {
        cycle_arr.push(
          new Cycle(
            element._id,
            element.owner,
            element.model,
            element.comments,
            element.available,
            element.brand,
            element.color,
            element.accessories,
            element.images
          )
        );
        if(brands.indexOf(element.brand)==-1){
          brands.push(element.brand);
        }
      });
      console.log(cycle_arr);
      console.log(brands);
    }catch (error) {
      alert(error.message);
    }
  }
