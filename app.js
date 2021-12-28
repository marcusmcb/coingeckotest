import express from 'express'
import fetch from 'node-fetch'
import colors from 'colors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// mongodb connection
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

// schema for each token's data
const CoinSchema = new mongoose.Schema({
  id: String,
  symbol: String,
  name: String,
  image: String,
  current_price: String,
})

const Coin = mongoose.model('coins', CoinSchema)

// fetch token data from API
const getCoins = async () => {
  try {
    let req = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=volume_desc&per_page=99&page=1&sparkline=true'
    )
    let response = await req.json()
    for (let i = 0; i < response.length; i++) {
      coinData.push(response[i])
    }
    console.log('---------------------------------------------'.yellow)
    console.log('*** API DATA RETURNED ***'.cyan)
    console.log('---------------------------------------------'.yellow)
    setCoins(coinData)
    return coinData
  } catch (err) {
    console.log(err)
  }
}

// set token data from API in Mongo collection
const setCoins = async (coinData) => {
  await mongoose.connection.db.dropCollection('coins', (err, result) => {
    if (result) {
      console.log('MongoDB collection COINS dropped.')
      console.log('---------------------------------------------'.yellow)
    } else {
      console.log(err)
    }
  })  

  for (let i = 0; i < 10; i++) {
    let newCoin = new Coin({
      id: coinData[i].id,
      symbol: coinData[i].symbol,
      name: coinData[i].name,
      image: coinData[i].image,
      current_price: coinData[i].current_price,
    })
    newCoin
      .save()
      .then(() => console.log('New coin added: ', coinData[i].name))
  }
}

const getCoinData = async () => {
  const filter = {}
  await Coin.find(filter).then(data => {
    console.log("DATA: ", data)
  })
}

app.get('/', async (req, res) => {
  getCoins()
  const filter = {}
  await Coin.find(filter).then(data => res.send(data))
  console.log("*** MONGODB QUERY EXECUTED ***")  
})

app.listen(PORT, () => {
  console.log('---------------------------------------------'.yellow)
  console.log(`*** Express App listening on PORT ${PORT} ***`.cyan)
  console.log('---------------------------------------------'.yellow)
})
