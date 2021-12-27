import express from 'express'
import fetch from 'node-fetch'
import colors from 'colors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

mongoose
  .connect(process.env.MONGO_PROD_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('---------------------------------------------'.yellow)
    console.log('*** MongoDB Cluster CONNECTED ***'.underline.magenta)
    console.log('---------------------------------------------'.yellow)
  })
  .catch((err) => console.log(err))

let coinData = []

const getCoins = async () => {
  try {
    let req = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=volume_desc&per_page=99&page=1&sparkline=true'
    )
    let response = await req.json()
    for (let i = 0; i < response.length; i++) {
      coinData.push(response[i])
    }
    console.log('MONGO KEY: ', process.env.MONGO_PROD_URI)
    console.log('DATA SAMPLE BELOW:'.cyan)
    console.log('---------------------------------------------'.yellow)
    console.log(coinData[1])
    console.log('---------------------------------------------'.yellow)
    setCoins(coinData)
    return coinData
  } catch (err) {
    console.log(err)
  }
}

const setCoins = async (coinData) => {

  const CoinSchema = new mongoose.Schema({
    id: String,
    symbol: String,
    name: String,
    image: String,
    current_price: String
  })

  const Coin = mongoose.model("coins", CoinSchema)

  const newCoin = new Coin({
    id: coinData[1].id,
    symbol: coinData[1].symbol,
    name: coinData[1].name,
    image: coinData[1].image,
    current_price: coinData[1].current_price
  })

  await newCoin.save().then(() => console.log("New coin added."))
}

app.get('/', async (req, res) => {
  getCoins().then((data) => res.send(data))
})

app.listen(PORT, () => {
  console.log('---------------------------------------------'.yellow)
  console.log(`*** Express App listening on PORT ${PORT} ***`.cyan)
  console.log('---------------------------------------------'.yellow)
})
