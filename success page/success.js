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
    if (data.rent) {
      await rentCycle(data);
    } else if (data.buy) {
      await buyCycle(data);
    }
  } catch (error) {
    console.log(error);
  }
};

const rentCycle = async (data) => {
  const resp = await fetch("http://localhost:3000/api/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      owner: data.owner,
      otherParty: data.renter,
      bookingStart: data.from,
      bookingEnd: data.to,
      cycle: data.cycle,
      txnType: "rent",
    }),
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
    const confirmation = await fetch("http://localhost:3000/api/rent/confirm", {
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
    });
    if (confirmation.status !== 200) {
      const confJson = await confirmation.json();
      throw new Error(confJson.message);
    }
  } else {
    throw new Error(respJson.message);
  }
};

const buyCycle = async (data) => {
  const resp = await fetch("http://localhost:3000/api/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      owner: data.owner,
      otherParty: data.buyer,
      cycle: data.cycle,
      txnType: "buy",
    }),
  });
  const respJson = await resp.json();
  if (resp.status !== 201) {
    throw new Error(respJson.message);
  }
  const confirmation = await fetch("http://localhost:3000/api/buy/confirm", {
    method: "POST",
    body: JSON.stringify({
      ownerId: data.owner,
      buyerId: data.buyer,
      cycleId: data.cycle,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (confirmation.status !== 200) {
    const confJson = await confirmation.json();
    throw new Error(confJson.message);
  }
  const cycleDel = await fetch(
    `http://localhost:3000/api/cycles/${data.cycle}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const cycleDelJson = await cycleDel.json();
  if (cycleUpdate.status !== 200) {
    throw new Error(cycleDelJson.message);
  }
};
makeTransaction().catch((err) => {
  console.log(err);
});
