const options = {
  jsonQuery: {
    foot_min: {
      type: "range",
      value: {
        lte: 15,
      },
    },
    _type: "flatsale",
    room: {
      type: "terms",
      value: [2, 3],
    },
    building_status: {
      type: "term",
      value: 2,
    },
    floor: {
      type: "range",
      value: {
        gte: 3,
      },
    },
    total_area: {
      type: "range",
      value: {
        gte: 58,
      },
    },
    price: {
      type: "range",
      value: {
        lte: 7300000,
      },
    },
    only_foot: {
      type: "term",
      value: "2",
    },
    engine_version: {
      type: "term",
      value: 2,
    },
    currency: {
      type: "term",
      value: 2,
    },
    only_flat: {
      type: "term",
      value: true,
    },
    from_developer: {
      type: "term",
      value: true,
    },
    region: {
      type: "terms",
      value: [4593],
    },
    kitchen: {
      type: "range",
      value: {
        gte: 9,
      },
    },
  },
};

const url = "https://api.cian.ru/search-offers/v2/search-offers-desktop/";

async function cianData(url, options) {
  return fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "text/plain;charset=UTF-8",
    },
    body: JSON.stringify(options),
  })
    .then((response) => response.json())
    .then((result) => {
      //console.log(result);
      let data = {};
      for (key in result.data.offersSerialized) {
        let json = result.data.offersSerialized;
        //console.log(json[key]);
        data[key] = {
          name: json[key].geo.jk.name,
          url: json[key].fullUrl,
          address: json[key].geo.userInput,
          price: json[key].bargainTerms.price,
          rooms: json[key].roomsCount,
          area: json[key].totalArea,
          kitchen: json[key].kitchenArea,
          floor: json[key].floorNumber,
          totalFloor: json[key].building.floorsCount,
          date: json[key].building.deadline.quarterEnd,
          metro: json[key].geo.undergrounds[0].name,
          time: json[key].geo.undergrounds[0].time,
        };
      }
      //console.log(data);
      return data;
    });
}

async function print() {
    const base = await cianData(url, options);

  let tbody = document.querySelector(".data");
  let tr = "";

  for (key in base) {
    tr = document.createElement("tr");
    tr.innerHTML =
      "<th><a href='" +
      base[key].url +
      "'>" +
      base[key].name +
      "</a></th><td>" +
      base[key].address +
      "</td><td>" +
      await setPrice(base[key].price) +
      "</td><td>" +
      base[key].rooms +
      "</td><td>" +
      base[key].area +
      "</td><td>" +
      base[key].kitchen +
      "</td><td>" +
      base[key].floor +
      "/" +
      base[key].totalFloor +
      "</td><td>" +
      base[key].date +
      "</td><td>" +
      base[key].metro +
      "</td><td>" +
      base[key].time +
      " мин.</td>";
    tbody.append(tr);
  }
}

print();

async function setPrice(price) {
    let newPrice = await Number.prototype.toFixed.call(parseFloat(price) || 0, 0);
    newPrice = await newPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

    return newPrice + ' ₽';
};