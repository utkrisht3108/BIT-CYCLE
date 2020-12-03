document.querySelector(".logout").onclick = async () => {
  try {
    const resp = await fetch("http://localhost:3000/api/users/logout", {
      method: "POST",
      credentials: "include",
    });
    const respJSON = await resp.json();
    if (resp.status === 200) {
      window.location.href = "../landing page/index.html";
    } else {
      throw new Error(respJSON.message);
    }
  } catch (error) {
    console.log(error);
  }
};
