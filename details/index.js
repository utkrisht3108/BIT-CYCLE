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

let requiredField = ["userId", "room", "phone", "first_name", "last_name"];
document.querySelector(".details-form").onsubmit = (e) => {
  e.preventDefault();
  const checkRadio = document.querySelectorAll(".exist")[0].checked;
  const checkRadio1 = document.querySelectorAll(".exist1")[0].checked;
  if (checkRadio) {
    requiredField = [...requiredField, "cycleName", "cycleColor", "boughtIn"];
  }
  if (checkRadio1) {
    requiredField = [...requiredField, "cyclePrice"];
  }
  for (let i = 0; i < e.target.elements.length; i++) {
    const attr = e.target.elements[i].getAttribute("name");
    let val = e.target.elements[i].value;
    if (attr === "userId") {
      value = e.target.elements[i].files[0];
    }
    if (requiredField.includes(attr) && !val) {
      e.target.elements[i].classList.add("wrong-input");
    } else {
      e.target.elements[i].classList.remove("wrong-input");
    }
  }
};
