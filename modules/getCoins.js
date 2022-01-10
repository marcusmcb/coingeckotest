import fetch from 'node-fetch'
import { clearDb } from './clearDb.js'
import chalk from 'chalk'

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
    for (let i = 0; i < response.length; i++) {
      coinData.push(response[i])
    }
    console.log(chalk.magenta('---------------------------------------------'))
    console.log(chalk.magenta('*** API Data Returned ***'))    
    console.log(chalk.magenta('---------------------------------------------'))
    console.log(chalk.bgMagenta(chalk.black("*** SAMPLE DATA BELOW ***")))
    console.log(chalk.magenta('---------------------------------------------'))    
    console.log(coinData[1])
    console.log(chalk.magenta('---------------------------------------------'))
    return coinData        
  } catch (err) {
    console.log(err)
  }
}