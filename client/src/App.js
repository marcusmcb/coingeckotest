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
        // future dev - proper error handling module
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
      {isBusy ? (
        <div className='loading-body'>          
          <div className='container alignment'>            
            <div className='box alignment'></div>
          </div>
        </div>
      ) : (
        <div className='main-panel'>
          {coinData.map((coin, i) => (
            <Fragment key={i}>
              <div className='coin-panel'>
                <p>
                  {coin.name} | {coin.symbol.toUpperCase()}
                </p>
                <p>${coin.current_price.toLocaleString()}</p>
                <img src={coin.image} alt='' />
              </div>
            </Fragment>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
