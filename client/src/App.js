import React, { Fragment, useState, useEffect } from 'react'
import './App.css'

const App = () => {
  const [coinData, setCoinData] = useState({})
  const [isBusy, setIsBusy] = useState(true)

  useEffect(() => {
    const getCoins = async () => {
      try {
        let req = await fetch('http://localhost:5000')
        let response = await req.json()
        return response
      } catch (err) {
        return err
      }
    }

    getCoins().then((data) => {
      if (data.error) {
        console.log(data.error)
        setCoinData(data)
        setIsBusy(false)
      } else {
        setCoinData(data)
        setIsBusy(false)
      }
    })
  }, [])

  return (
    <div className='App'>
      <div>
        {isBusy ? (
          <p>Loading...</p>
        ) : (
          <div>
            {coinData.map((coin, i) => (
              <Fragment>
                <div key={i}>
                  <h3>Info:</h3>
                  <p>Symbol: {coin.symbol.toUpperCase()}</p>
                  <p>Name: {coin.name}</p>
                  <p>Price: {coin.current_price.toLocaleString()}</p>
                  <img src={coin.image} />
                  <hr />
                </div>
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
