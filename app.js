import express from 'express'
import fetch from 'node-fetch'

const app = express()

const PORT = process.env.PORT || 3000

let coinData = []

const getCoins = async () => {
  try {
    let req = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=volume_desc&per_page=99&page=1&sparkline=true'
    )
    let response = await req.json()
    // console.log("RESPONSE: ", response[1].id);
    for (let i = 0; i < response.length; i++) {
      coinData.push(response[i])
    }
    console.log("DATA SAMPLE: ",coinData[1])
    console.log('---------------------------------------------')
    return coinData        
  } catch (err) {
    console.log(err)
  }
}

app.get('/getcoins', async (req, res) => {
   let response = await getCoins()
   console.log(' --- API response returned --- ')
   res.send(response)
})

app.listen(PORT, () => {
  console.log('---------------------------------------------')
  console.log(`*** Express App listening on PORT ${PORT} ***`)
  console.log('---------------------------------------------')
})
