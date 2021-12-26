import fetch from "node-fetch";

let coinData = []

const getCoins = async () => {
  try {
    let req = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=volume_desc&per_page=99&page=1&sparkline=true');
    let response = await req.json();
    // console.log("RESPONSE: ", response[1].id);
    for (let i = 0; i < response.length; i++) {
      coinData.push(response[i])
    }
    console.log("COIN DATA: ", coinData[1])
  } catch (err) {
    console.log(err);
  }
};

getCoins();

