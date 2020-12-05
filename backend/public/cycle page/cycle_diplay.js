import Cycle from './cycle.js';
if (localStorage.getItem('loggedIn') !== 'true') {
  window.location.href = '../landing page';
}

var cycle_arr = []; //array of cycles(class)
var brands = [];
var i = 0;
var filter_brands = [];
var filter_access = [];
var filter_colors = [];
var buy_purpose = -1;
var buy_purpose1 = -1;
var rent_purpose = -1;
var sell_range = document.querySelector('.sell-range');
var sell_range1 = document.querySelector('.sell-range1');
var cycle_box = document.querySelector('#all-cycles');
var check_boxes = document.querySelectorAll('.checks');
var loginuser = localStorage.getItem('user_id');
var rangeval = document.querySelector('.rangeval');
var range = document.querySelector('.range');
var rangeval1 = document.querySelector('.rangeval1');
var range1 = document.querySelector('.range1');
lol();
function lol() {
  range.oninput = () => {
    // rangeval.innerHTML="";
    rangeval.innerHTML = range.value;
  };
}
lol1();
function lol1() {
  range1.oninput = () => {
    // rangeval.innerHTML="";
    rangeval1.innerHTML = range1.value;
  };
}
brand_filter();
function brand_filter() {
  console.log(check_boxes);
  check_boxes.forEach((check_box) => {
    check_box.onclick = () => {
      if (check_box.checked === true) {
        if (check_box.classList.contains('purpose-check')) {
          if (check_box.value == 'buy1') {
            buy_purpose1 = 1;
            sell_range1.classList.remove('hidden');
            console.log('lol');
          }
          if (check_box.value == 'buy') {
            buy_purpose = 1;
            sell_range.classList.remove('hidden');
            console.log('lol');
            console.log(sell_range);
          }
          if (check_box.value == 'rent') {
            rent_purpose = 1;
          }
        }
        if (check_box.classList.contains('brand-check')) {
          console.log('lolll');
          filter_brands.push(check_box.value);
        }
        if (check_box.classList.contains('access-check')) {
          console.log('lolll');
          filter_access.push(check_box.value);
        }
        if (check_box.classList.contains('color-check')) {
          console.log('lolll');
          filter_colors.push(check_box.value);
        }
        filtered_render();
      } else {
        if (check_box.classList.contains('purpose-check')) {
          if (check_box.value == 'buy1') {
            buy_purpose1 = -1;
            sell_range1.classList.add('hidden');
          }
          if (check_box.value == 'buy') {
            buy_purpose = -1;
            sell_range.classList.add('hidden');
          }
          if (check_box.value == 'rent') {
            rent_purpose = -1;
          }
        }
        if (check_box.classList.contains('brand-check')) {
          console.log('lolll');
          var a = filter_brands.indexOf(check_box.value);
          filter_brands.splice(a, 1);
        }
        if (check_box.classList.contains('access-check')) {
          console.log('lolll');
          var a = filter_access.indexOf(check_box.value);
          filter_access.splice(a, 1);
        }
        if (check_box.classList.contains('color-check')) {
          console.log('lolll');
          var a = filter_colors.indexOf(check_box.value);
          filter_colors.splice(a, 1);
        }

        filtered_render();
      }
    };
  });
  sell_range.oninput = () => {
    filtered_render();
  };
  sell_range1.oninput = () => {
    filtered_render();
  };
}

render_cycles();
function filtered_render() {
  var match = 1;
  var c = 0;
  var filterapplied = 0;
  cycle_box.innerHTML = '';
  console.log(filter_brands);
  console.log(filter_access);
  console.log(buy_purpose);
  console.log(rent_purpose);
  cycle_arr.forEach((element) => {
    match = 1;
    if (buy_purpose1 != -1) {
      filterapplied = 1;
      if (
        element.forbuy == true &&
        element.buyPrice <= document.querySelector('.range1').value
      ) {
        console.log('lol');
      } else {
        match = 0;
      }
    }
    if (buy_purpose != -1) {
      filterapplied = 1;
      if (
        element.forbuy == true &&
        element.buyPrice <= document.querySelector('.range').value
      ) {
        console.log('lol');
      } else {
        match = 0;
      }
    }
    if (rent_purpose != -1) {
      filterapplied = 1;
      if (element.forrent == true) {
        console.log('lol');
      } else {
        match = 0;
      }
    }
    if (filter_brands.length != 0) {
      filterapplied = 1;
      if (filter_brands.indexOf(element.brand) > -1) {
        console.log('lol');
      } else {
        match = 0;
      }
    }
    if (filter_access.length != 0) {
      filterapplied = 1;
      if (filter_access.some((r) => element.accessories.indexOf(r) > -1))
        console.log('lol');
      else {
        match = 0;
      }
    }
    if (filter_colors.length != 0) {
      filterapplied = 1;
      if (filter_colors.indexOf(element.color) > -1) {
        console.log('lol');
      } else {
        match = 0;
      }
    }
    if (match == 1) {
      c++;
      cycle_box.appendChild(element.getelement());
    }
  });
  if (c == 0 && filterapplied == 1) {
    cycle_box.innerHTML = '...<h2>No cycle found</h2>....';
  }
  console.log(c);
}
async function render_cycles() {
  await get_cycles();
  cycle_arr.forEach((element) => {
    // temp=element.getelement();
    cycle_box.appendChild(element.getelement());
  });
}
// get_cycles();
async function get_cycles() {
  try {
    const res = await fetch('/api/cycles');
    const respJson = await res.json();
    console.log(respJson);
    if (respJson.status === 'error') {
      throw new Error(respJSON.message);
    }

    respJson.data.cycle.forEach((element) => {
      if (
        !element.bookingStarts ||
        !element.bookingEnds ||
        Date.now() > element.bookingEnds
      ) {
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
            element.images,
            element.forbuy,
            element.forrent,
            element.buyPrice
          )
        );
      }
      if (brands.indexOf(element.brand) == -1) {
        brands.push(element.brand);
      }
    });
    console.log(cycle_arr);
    // console.log(brands);
  } catch (error) {
    alert(error.message);
  }
}
