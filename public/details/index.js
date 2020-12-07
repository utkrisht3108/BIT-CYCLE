let userAccount;
try {
  userAccount = localStorage.getItem('userAccount');
  if (!userAccount) {
    throw new Error('Kindly Enter email and password on landing page');
  }
  userAccount = atob(userAccount);
  userAccount = JSON.parse(userAccount);
} catch (error) {
  console.log(error);
}

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
    document.querySelector('input[name="cycleModel"]').value = '';
    document.querySelector('input[name="cycleColor"]').value = '';
    document.querySelector('select[name="boughtIn"]').value = 1;
    document
      .querySelectorAll('input[name="acc"]')
      .forEach((node) => (node.checked = false));
    document.querySelectorAll('input[name="exist1"]')[1].checked = true;
    party4();
    document.querySelectorAll('input[name="exist2"]')[1].checked = true;
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

    console.log('sad');
  }
}

const addWrongInput = (e, i) => {
  e.target.elements[i].classList.add('wrong-input');
};

const removeWrongInput = (e, i) => {
  e.target.elements[i].classList.remove('wrong-input');
};
let requiredField = ['userId', 'room', 'phone', 'first_name', 'last_name'];

const postUser = async (e) => {
  try {
    const formData = new FormData();
    formData.append('email', userAccount.email);
    console.log(formData.get('email'));
    formData.append('password', userAccount.password);
    formData.append('passwordConfirm', userAccount.passwordConfirm);
    const firstName = e.target.first_name.value;
    const lastName = e.target.last_name.value;
    const name = firstName + ' ' + lastName;
    formData.append('name', name);
    formData.append('phone', e.target.phone.value);
    formData.append('hostel', e.target.hostel.value);
    formData.append('room', e.target.room.value);
    if (e.target.userPhoto.files) {
      formData.append('userImage', e.target.userPhoto.files[0]);
    }
    formData.append('userId', e.target.userId.files[0]);
    console.log(e.target.userId.files[0]);
    const resp = await fetch('/api/users/signup', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    console.log(resp);
    const respJSON = await resp.json();
    //localStorage.removeItem('userAccount');
    console.log(respJSON);
    if (resp.status === 201) {
      return respJSON.data.newUser._id;
    } else {
      throw new Error(respJSON.message);
    }
  } catch (error) {
    console.log(error);
  }
};

const postCycle = async (e, userId, checked) => {
  try {
    const formData = new FormData();

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
    console.log(formData.get('brand'));
    formData.append('owner', userId);
    let accessories = [];
    document.querySelectorAll('.accesories').forEach((node) => {
      if (node.children[0].checked) {
        accessories.push(node.children[1].innerHTML);
      }
    });
    accessories.forEach((acc) => {
      formData.append('accessories', acc);
    });
    console.log(checked);
    formData.append('forbuy', checked);
    if (checked) {
      formData.append('buyPrice', e.target.cyclePrice.value);
      console.log(e.target.acc);
    }
    formData.append('forrent', document.querySelectorAll('.exist2')[0].checked);
    if (e.target.photos.files) {
      [...e.target.photos.files].forEach((file) => {
        formData.append('cycleImages', file);
      });
    }
    const resp = await fetch('/api/cycles/', {
      method: 'POST',
      body: formData,
    });
    const respJSON = await resp.json();
    console.log(respJSON);
    if (resp.status != 201) {
      throw new Error(respJSON.message);
    }
  } catch (error) {
    console.log(error);
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
    const userId = await postUser(e);
    localStorage.setItem('loggedIn', true);
    localStorage.setItem('user_id', userId);
    if (checkRadio) {
      await postCycle(e, userId, checkRadio1);
    }
    window.location.href = '../cycle page/index.html';
  }
};
document.getElementById('email').placeholder = userAccount.email;

var other = document.querySelector('.other');
var brand = document.querySelector('.brandInput');

//brand.classList.add('hidden');

function checkvalue(val) {
  if (val === '7')
    document.getElementById('cycleBrand').style.display = 'block';
  else document.getElementById('cycleBrand').style.display = 'none';
}
