import React, { Fragment, useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';

const App = () => { 
  
  const [coinData, setCoinData] = useState({})
  const [isBusy, setIsBusy] = useState(true)

  useEffect(() => {
    const getCoins = async () => {
      try {
        let req = await fetch("http://localhost:5000")
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
    <div className="App">
      <header className="App-header">            
        <div>
          {isBusy ? (
            <p>Loading...</p>
          ) : (
            <Fragment>
              <div>
              <h1>Data</h1>
              <p>Symbol: {coinData[1].symbol}</p>            
              <p>Name: {coinData[1].name}</p>            
              <p>Price: {coinData[1].current_price}</p>                          
              </div>
            </Fragment>          
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
