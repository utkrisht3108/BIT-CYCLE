const makeTransaction = async () => {
  const url = document.location.href;
  const params = url.split("?")[1].split("&");
  const data = {};
  params.forEach((param) => {
    const [property, value] = param.split("=");
    data[property] = value;
  });
  const resp = await fetch("http://localhost:3000/api/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const respJson = await resp.json();
  console.log(respJson);
  console.log(data);
};

makeTransaction().catch((err) => {
  console.log(err);
});
