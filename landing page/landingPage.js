document.querySelector(".login-btn").onclick = async () => {
  try {
    const email = document.querySelector(".login-email").value;
    const password = document.querySelector(".login-password").value;
    if (!email || !password) {
      throw new Error("Kindly Enter email and password");
    }
    console.log(email, password);
    const resp = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const respJSON = await resp.json();
    console.log(respJSON);
  } catch (error) {
    console.log(error);
  }
};

document.querySelector(".signup-btn").onclick = async () => {
  try {
    const email = document.querySelector(".signup-email").value;
    const password = document.querySelector(".signup-password").value;
    const passwordConfirm = document.querySelector(".signup-passwordConfirm").value;
    if (!email || !password) {
      throw new Error("Kindly Enter email and password");
    }
    if (password !== passwordConfirm) {
      throw new Error("Passwords do not match");
    }
    console.log(email, password);
    const resp = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        passwordConfirm,
      }),
    });
    const respJSON = await resp.json();
    console.log(respJSON);
  } catch (error) {
    console.log(error);
  }
};
