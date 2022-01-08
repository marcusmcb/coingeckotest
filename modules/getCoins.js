import fetch from 'node-fetch'
import { clearDb } from './clearDb.js'

// temp var to hold returned api data
let coinData = []

// export function to fetch & return api data
export async function getCoins() {  
  await clearDb()  
  try {
    let req = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=volume_desc&per_page=99&page=1&sparkline=true'
    )
    let response = await req.json()
    // check for response.error here and return error to server if so
    for (let i = 0; i < response.length; i++) {
      coinData.push(response[i])
    }
    console.log('---------------------------------------------'.yellow)
    console.log('*** API Data Returned ***'.cyan)    
    console.log('---------------------------------------------'.yellow)
    console.log("*** SAMPLE DATA BELOW ***".yellow)
    console.log('---------------------------------------------'.yellow)    
    console.log(coinData[1])
    console.log('---------------------------------------------'.yellow)
    return coinData        
  } catch (err) {
    console.log(err)
  }
}