const makeTransaction = async () => {
  try {
    const url = document.location.href;
    const params = url.split("?")[1].split("&");
    const data = {};
    params.forEach((param) => {
      const [property, value] = param.split("=");
      data[property] = value;
    });
    console.log(data);
    const resp = await fetch("http://localhost:3000/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const respJson = await resp.json();
    if (resp.status === 201) {
      if (!data.from || !data.to) {
        throw new Error("Enter booking dates");
      }
      const cycleUpdate = await fetch(
        `http://localhost:3000/api/cycles/${data.cycle}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingStarts: data.from,
            bookingEnds: data.to,
          }),
        }
      );
      const cycleUpdateJson = await cycleUpdate.json();
      if (cycleUpdate.status !== 200) {
        throw new Error(cycleUpdateJson.message);
      }
      const confirmation = await fetch(
        "http://localhost:3000/api/rent/confirm",
        {
          method: "POST",
          body: JSON.stringify({
            ownerId: data.owner,
            renterId: data.renter,
            cycleId: data.cycle,
            from: data.from,
            to: data.to,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (confirmation.status !== 200) {
        const confJson = await confirmation.json();
        throw new Error(confJson.message);
      }
    } else {
      throw new Error(respJson.message);
    }
  } catch (error) {
    console.log(error);
  }
};

makeTransaction().catch((err) => {
  console.log(err);
});
