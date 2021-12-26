import fetch from "node-fetch";

const getCoins = async () => {
  try {
    let req = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=volume_desc&per_page=99&page=1&sparkline=true');
    let response = await req.json();
    console.log("RESPONSE: ", response);
  } catch (err) {
    console.log(err);
  }
};

getCoins();
