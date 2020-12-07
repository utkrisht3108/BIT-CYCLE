function party1() {
  var part1 = document.querySelector('.part1');
  var checkRadio = document.querySelector('input[name="exist"]:checked');
  if (checkRadio != null) {
    part1.classList.remove('hidden');
  }
}
function party2() {
  var part1 = document.querySelector('.part1');
  var checkRadio = document.querySelector('input[name="exist"]:checked');
  console.log(checkRadio);
  if (checkRadio != null) {
    part1.classList.add('hidden');
    document.querySelector('input[name="cycleName"]').value = '';
    document.querySelector('input[name="cycleColor"]').value = '';
    document.querySelector('select[name="boughtIn"]').value = 1;
    console.log('sad');
  }
}
function party3() {
  var part1 = document.querySelector('.part2');
  var checkRadio = document.querySelector('input[name="exist1"]:checked');
  console.log(checkRadio);
  if (checkRadio != null) {
    part1.classList.remove('hidden');
    console.log('haha');
  }
}
function party4() {
  var part1 = document.querySelector('.part2');
  var checkRadio = document.querySelector('input[name="exist1"]:checked');
  console.log(checkRadio);
  if (checkRadio != null) {
    part1.classList.add('hidden');
    document.querySelector('input[name="cyclePrice"]').value = '';
    document
      .querySelectorAll('input[name="acc"]')
      .forEach((node) => (node.checked = false));
    console.log('sad');
  }
}
var loginuser = localStorage.getItem('user_id');
show_data().catch((err) => alert(err.message));
let cycle = {};

async function show_data() {
  user = await get_user();
  const userName = user.name.split(' ');
  const firstName = userName[0];
  userName.shift();
  const lastName = userName.join('');
  document.getElementById('fName').value = firstName;
  document.getElementById('sName').value = lastName;
  document.getElementById('email').value = user.email;
  document.getElementById('phone').value = user.phone;
  document.getElementById('hostel').value = user.hostel;
  document.getElementById('room').value = user.room;
  // document.getElementById("userPhoto").value = user.userImage;
  // document.getElementById("userId").value = user.userId;
  if (user.cycles.length > 0) {
    document.querySelector('input[name="exist"]').checked = true;
    party1();
    const cycleId = user.cycles[user.cycles.length - 1];
    cycle = await getCycle(cycleId);
    console.log(cycle, document.getElementById('cycleName'));
    let value = 7;
    document.querySelectorAll('.selectValue').forEach((ele) => {
      if (cycle.brand.toLowerCase() === ele.innerHTML.toLowerCase()) {
        value = ele.getAttribute('value');
      }
    });
    document.querySelector('select[name="brandname"]').value = value;
    checkvalue(value);
    document.querySelector('#cycleBrand').value = cycle.brand;
    document.getElementById('cycleModel').value = cycle.model;
    document.getElementById('cycleColor').value = cycle.color;
    let year = 0;
    [...document.getElementById('boughtIn').options].forEach((option, i) => {
      if (option.innerHTML === cycle.boughtIn) {
        year = i;
      }
    });
    document.getElementById('boughtIn').value = year + 1;
    document.querySelectorAll('.accesories').forEach((node) => {
      if (
        cycle.accessories.includes(node.children[1].innerHTML.toLowerCase())
      ) {
        node.children[0].checked = true;
      }
    });
    if (cycle.buyPrice) {
      document.querySelector('input[name="exist1"]').checked = true;
      party3();
      document.getElementById('cyclePrice').value = cycle.buyPrice;
    }
  }

  // checkbox ka patanahi
}
async function get_user() {
  try {
    const res = await fetch('/api/users/' + loginuser);
    const respJson = await res.json();
    console.log(respJson);
    if (respJson.status === 'error') {
      throw new Error(respJSON.message);
    }
    return respJson.user;
  } catch (error) {
    alert(error.message);
  }
}
async function getCycle(cycleId) {
  try {
    const res = await fetch(`/api/cycles/${cycleId}`);
    const resJson = await res.json();
    console.log(resJson);
    if (res.status !== 200) {
      throw new Error(resJson.message);
    } else {
      return resJson.data.cycle;
    }
  } catch (error) {
    alert(error.message);
  }
}
var other = document.querySelector('.other');
var brand = document.querySelector('.brandInput');

//brand.classList.add('hidden');

function checkvalue(val) {
  if (val === '7' || val === 7)
    document.getElementById('cycleBrand').style.display = 'block';
  else document.getElementById('cycleBrand').style.display = 'none';
}

const addWrongInput = (e, i) => {
  e.target.elements[i].classList.add('wrong-input');
};

const removeWrongInput = (e, i) => {
  e.target.elements[i].classList.remove('wrong-input');
};
let requiredField = ['room', 'phone', 'first_name', 'last_name'];

const patchUser = async (e) => {
  const formData = new FormData();
  const firstName = e.target.first_name.value;
  const lastName = e.target.last_name.value;
  const name = firstName + ' ' + lastName;
  formData.append('name', name);
  formData.append('phone', e.target.phone.value);
  formData.append('hostel', e.target.hostel.value);
  formData.append('room', e.target.room.value);
  if (e.target.userPhoto.files[0]) {
    formData.append('userImage', e.target.userPhoto.files[0]);
  }
  if (e.target.userId.files[0]) {
    formData.append('userId', e.target.userId.files[0]);
  }
  const resp = await fetch(`/api/users/${loginuser}`, {
    method: 'PATCH',
    body: formData,
  });
  console.log(resp);
  const respJSON = await resp.json();
  console.log(respJSON);
  if (resp.status !== 200) {
    throw new Error(respJSON.message);
  }
};

const sendCycle = async (e, checked, method) => {
  const formData = new FormData();
  let url = '/api/cycles/';
  if (method === 'PATCH') {
    url += cycle._id;
  }
  formData.append('model', e.target.cycleModel.value);
  formData.append('color', e.target.cycleColor.value);
  formData.append(
    'boughtIn',
    e.target.boughtIn.options[e.target.boughtIn.value - 1].innerHTML
  );
  if (e.target.brandname.value !== '7') {
    formData.append(
      'brand',
      e.target.brandname.options[e.target.brandname.value - 1].innerHTML
    );
  } else {
    formData.append('brand', document.querySelector('#cycleBrand').value);
  }
  formData.append('owner', loginuser);
  let accessories = [];
  document.querySelectorAll('.accesories').forEach((node) => {
    if (node.children[0].checked) {
      accessories.push(node.children[1].innerHTML);
    }
  });
  accessories.forEach((acc) => {
    formData.append('accessories', acc);
  });
  if (checked) {
    formData.append('buyPrice', e.target.cyclePrice.value);
  }
  if (e.target.photos.files.length > 0) {
    [...e.target.photos.files].forEach((file) => {
      formData.append('cycleImages', file);
    });
  }
  const resp = await fetch(url, {
    method: method,
    body: formData,
  });
  const respJSON = await resp.json();
  if (method==='PATCH' && resp.status != 200) {
    throw new Error(respJSON.message);
  }
  if (method==='POST' && resp.status != 201) {
    throw new Error(respJSON.message);
  }
};

const deleteCycle = async () => {
  const resp = await fetch(`/api/cycles/${cycle._id}`, { method: 'DELETE' });
  if (resp.status !== 200) {
    throw new Error((await resp.json()).message);
  }
};
document.querySelector('.details-form').onsubmit = async (e) => {
  e.preventDefault();
  const checkRadio = document.querySelectorAll('.exist')[0].checked;
  const checkRadio1 = document.querySelectorAll('.exist1')[0].checked;
  if (checkRadio) {
    requiredField = [
      ...requiredField,
      'cycleColor',
      'boughtIn',
      'cycleModel',
      'cycleBrand',
    ];
  }
  if (checkRadio1) {
    requiredField = [...requiredField, 'cyclePrice'];
  }
  let count = 0;
  for (let i = 0; i < e.target.elements.length; i++) {
    const attr = e.target.elements[i].getAttribute('name');
    let val = e.target.elements[i].value;
    if (attr === 'userId') {
      value = e.target.elements[i].files[0];
    }
    if (requiredField.includes(attr) && !val) {
      addWrongInput(e, i);
    } else if (requiredField.includes(attr)) {
      count++;
      removeWrongInput(e, i);
    }
    if (attr === 'phone' && !val.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
      addWrongInput(e, i);
    } else if (attr === 'phone') {
      count++;
      removeWrongInput(e, i);
    }
    if (attr === 'room' && !val.match(/^[1-4][0-9]{2}|500/)) {
      addWrongInput(e, i);
    } else if (attr === 'room') {
      count++;
      removeWrongInput(e, i);
    }
  }
  if (checkRadio) {
    if (document.querySelector('select[name="brandname"]').value === '7') {
      if (!document.querySelector('#cycleBrand').value) {
        document.querySelector('#cycleBrand').classList.add('wrong-input');
      } else {
        count++;
        document.querySelector('#cycleBrand').classList.remove('wrong-input');
      }
    } else {
      count++;
    }
  }
  if (count === requiredField.length + 2) {
    try {
      await patchUser(e);
      if (checkRadio) {
        if (cycle._id) {
          await sendCycle(e, checkRadio1, 'PATCH');
        } else {
          await sendCycle(e, checkRadio1, 'POST');
        }
      }
      if (cycle._id && !checkRadio) {
        await deleteCycle();
      }
      document.querySelector('.success').classList.remove('hidden');
      document.querySelector('.error').classList.add('hidden');
      window.location.href = '../cycle page/index.html';
    } catch (error) {
      document.querySelector('.error').classList.remove('hidden');
      document.querySelector('.error').innerHTML = error.message;
    }
  }
};
