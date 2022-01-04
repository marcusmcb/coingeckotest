import express from 'express'
import fetch from 'node-fetch'
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
    console.log('*** MongoDB Cluster CONNECTED ***'.underline.magenta)
    console.log('---------------------------------------------'.yellow)
  })
  .catch((err) => console.log(err))

// schema for each token's data
const CoinSchema = new mongoose.Schema({  
  symbol: String,
  name: String,
  image: String,
  current_price: String,
})

const Coin = mongoose.model('coins', CoinSchema)

// set token data from API in Mongo collection
const setCoins = async (coinData) => {
  for (let i = 0; i < 20; i++) {
    let newCoin = new Coin({      
      symbol: coinData[i].symbol,
      name: coinData[i].name,
      image: coinData[i].image,
      current_price: coinData[i].current_price,
    })
    await newCoin
      .save()
      .then(() => console.log('New coin added: ', coinData[i].name))
  }   
}

// cors middleware
app.use(cors())

// default endpoint to fetch api data & return it to client
app.get('/', async (req, res) => {
  const filter = {}
  let apiData = await getCoins()
  await setCoins(apiData)
  // query all from collection & return data as response  
  await Coin.find(filter).then(data => {
    console.log('---------------------------------------------'.yellow)
    console.log("GETCOINDATA: ", data)
    console.log('---------------------------------------------'.yellow)
    res.send(data)
  })   
})

app.listen(PORT, () => {
  console.log('---------------------------------------------'.yellow)
  console.log(`*** Express App listening on PORT ${PORT} ***`.cyan)
  console.log('---------------------------------------------'.yellow)
})
