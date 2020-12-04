document.querySelector(".login-btn").onclick = async () => {
  try {
    const email = document.querySelector(".login-email").value;
    const password = document.querySelector(".login-password").value;
    if (!email || !password) {
      throw new Error("Kindly Enter email and password");
    }
    console.log(email, password);
    const resp = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: "include",
    });
    const respJSON = await resp.json();
    if (resp.status == 200) {
      localStorage.setItem("user_id", respJSON.user_id);
      window.location.href = "../cycle page/";
    }
    console.log(respJSON);
  } catch (error) {
    console.log(error);
  }
};

console.log(document.getElementById("signupButton"));
document.getElementById("signupButton").onclick = () => {
  try {
    const email = document.querySelector(".signup-email").value;
    const password = document.querySelector(".signup-password").value;
    const passwordConfirm = document.querySelector(".signup-passwordConfirm")
      .value;
    if (!email || !password) {
      throw new Error("Kindly Enter email and password");
    }
    if (password !== passwordConfirm) {
      throw new Error("Passwords do not match");
    }
    let account = {
      email,
      password,
      passwordConfirm,
    };
    console.log(account);
    account = JSON.stringify(account);
    account = btoa(account);
    localStorage.setItem("userAccount", account);
    window.location.href = "../details/index.html";
  } catch (error) {
    console.log(error);
  }
};

var btn1 = document.querySelector(".btn1");
var slide = document.querySelector(".slideJ");
var btn2 = document.querySelector(".btn2");
btn1.onclick = () => {
  btn1.classList.add("hidden");
  slide.classList.remove("hidden");
  btn2.classList.remove("hidden");
};
btn2.onclick = () => {
  btn1.classList.remove("hidden");
  slide.classList.add("hidden");
  btn2.classList.add("hidden");
};
// var sbtn = document.getElementById("signupButton");
// sbtn.onclick = () => {
//   window.location.href = "../details/";
// };
// var lbtn = document.getElementById("loginButton");
// lbtn.onclick = () => {
//   window.location.href = "../cycle page/";
// };
