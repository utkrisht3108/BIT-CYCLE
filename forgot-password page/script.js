document.querySelector(".forgot-password").onclick = async (e) => {
  try {
    const email = document.querySelector('input[name="email"]').value;
    console.log(email);
    const resp = await fetch("http://localhost:3000/api/users/forgotPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (resp.status === 200) {
      document.querySelector(".secondary-form").classList.remove("hidden");
      document.querySelector(".forgot-password").classList.add("hidden");
      document.querySelector(".reset-password").classList.remove("hidden");
      document
        .querySelector('input[name="email"]')
        .setAttribute("disabled", "true");
    } else {
      const respJSON = await resp.json();
      throw new Error(respJSON.message);
    }
  } catch (e) {
    document.querySelector(".error").innerHTML = error.message;
    document.querySelector(".error").classList.remove("hidden");
  }
};

document.querySelector(".reset-password").onclick = async () => {
  try {
    const email = document.querySelector('input[name="email"]').value;
    const token = document.querySelector('input[name="token"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const passwordConfirm = document.querySelector(
      'input[name="passwordConfirm"]'
    ).value;
    if (password !== passwordConfirm) {
      throw new Error("Passwords do not match");
    }
    const resp = await fetch("http://localhost:3000/api/users/resetPassword", {
      method: "PATCH",
      body: JSON.stringify({
        email,
        resetToken: token,
        password,
        passwordConfirm,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (resp.status === 200) {
      document.querySelector(".success").classList.remove("hidden");
    } else {
      const respJSON = await resp.json();
      throw new Error(respJSON.message);
    }
    console.log(await resp.json());
  } catch (error) {
    document.querySelector(".error").innerHTML = error.message;
    document.querySelector(".error").classList.remove("hidden");
  }
};
