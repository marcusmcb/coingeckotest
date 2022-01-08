// *** DEVELOPMENT BRANCH ***

import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'

import { getCoins } from './modules/getCoins.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// mongo cluster connection
mongoose
  .connect(process.env.MONGO_PROD_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('---------------------------------------------'.yellow)
    console.log('*** MongoDB Cluster CONNECTED ***'.magenta)
    console.log('---------------------------------------------'.yellow)
  })
  // future dev - proper error handling module
  .catch((err) => console.log(err))

// schema for each token's data
const CoinSchema = new mongoose.Schema({  
  symbol: String,
  name: String,
  image: String,
  current_price: Number,
  price_change_24h: Number,
  price_change_percentage_24h: Number,
  sparkline_data: []
})

const Coin = mongoose.model('coins', CoinSchema)

// set token data from API in Mongo collection
const setCoins = async (coinData) => {
  for (let i = 0; i < 20; i++) {
    // *** check returned data for null values ***
    let newCoin = new Coin({      
      symbol: coinData[i].symbol,
      name: coinData[i].name,
      image: coinData[i].image,
      current_price: coinData[i].current_price,
      price_change_24h: coinData[i].price_change_24h,
      price_change_percentage_24h: coinData[i].price_change_percentage_24h,
      sparkline_data: coinData[i].sparkline_in_7d.price
    })
    // *** error handling if mongo save fails ***
    await newCoin
      .save()
      .then(() => console.log('New coin added: '.yellow, coinData[i].name))
  }   
}

// cors middleware
app.use(cors())

// default endpoint to fetch api data & return it to client
app.get('/', async (req, res) => {
  const filter = {}
  // *** check for error in return here ***
  let apiData = await getCoins()
  await setCoins(apiData)
  // query all from collection & return data as response  
  await Coin.find(filter).then(data => {
    console.log('---------------------------------------------'.yellow)
    console.log("EXPRESS DATA RETURNED (Sample Below)".green)
    console.log('---------------------------------------------'.yellow)
    console.log(data[1])
    console.log('---------------------------------------------'.yellow)
    res.send(data)
  })   
})

app.listen(PORT, () => {
  console.log('---------------------------------------------'.yellow)
  console.log(`*** Express App listening on PORT ${PORT} ***`.cyan)
  console.log('---------------------------------------------'.yellow)
})
