import Cycle from './cycle.js';

var cycle_arr = [];                //array of cycles(class)
var cycle_box =document.querySelector("#all-cycles");
render_cycles();
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
            element.name,
            element.model,
            element.comments,
            element.available
          )
        );
      });
      console.log(cycle_arr);
    }catch (error) {
      alert(error.message);
    }
  }
