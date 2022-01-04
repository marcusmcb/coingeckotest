import mongoose from 'mongoose'

// helper method to clear saved data on page load
export async function clearDb() {
  await mongoose.connection.db.dropCollection('coins', (err, result) => {
    if (result) {
      console.log('MongoDB collection COINS dropped.')
      console.log('---------------------------------------------'.yellow)
    } else {
      console.log(err)
    }
  }) 
}