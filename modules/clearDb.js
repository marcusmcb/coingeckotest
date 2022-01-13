import mongoose from 'mongoose'
import chalk from 'chalk'

// helper method to clear saved data on page load
export async function clearDb() {
  await mongoose.connection.db
    .listCollections({ name: 'coins' })
    .next((err, data) => {
      if (data.name) {
        console.log(chalk.yellow('MONGO COLLECTIONS: ', data.name))
        mongoose.connection.db.dropCollection('coins', (err, result) => {
          if (result) {
            console.log(
              chalk.green('---------------------------------------------')
            )
            console.log(chalk.green('MongoDB collection COINS dropped.'))
            console.log(
              chalk.green('---------------------------------------------')
            )
          } else {
            return
          }
        })
      } else {
        console.log(err)
      }
    })
}
