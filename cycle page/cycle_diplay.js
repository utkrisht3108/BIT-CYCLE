import Cycle from './cycle.js';

var cycle_arr = [];                //array of cycles(class)
var brands =[];
var i=0;
var filter_brands= [];
var cycle_box =document.querySelector("#all-cycles");
var check_boxes=document.querySelectorAll(".checks");
console.log(check_boxes);
brand_filter();
function brand_filter(){
  console.log(check_boxes);
  check_boxes.forEach((check_box) => {
    check_box.onclick = () =>{
      if(check_box.checked===true){
        filter_brands.push(check_box.value);
        filtered_render();

      }
      else{
        var a= filter_brands.indexOf(check_box.value);
        filter_brands.splice(a,1);
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
  cycle_arr.forEach((element) => {
    console.log(element.brand);
    if(filter_brands.indexOf(element.brand)>-1){
      c++;
      cycle_box.appendChild(element.getelement());
    }
    // temp=element.getelement();
    
  });
  if(c==0){
    cycle_box.innerHTML="...<h2>No cycles of the desired brand</h2>....";
  }
  if(filter_brands.length==0){
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
            element.brand
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
