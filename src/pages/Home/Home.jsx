import React, { useEffect } from 'react'
import './Home.css'
import { useContext } from 'react'
import { CoinContext } from '../../context/CoinContext'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

    const {allCoin, currency} = useContext(CoinContext);
    const [displayCoin, setDisplayCoin] = useState([]);
    const [input, setInput] = useState("")

    const inputHandler = (event) => {
        setInput(event.target.value)
        if (event.target.value === "") {
            setDisplayCoin(allCoin)
        }
    }

    const searchHandler = async (event) => {
        event.preventDefault()
        const coins = await allCoin.filter((item) => {
            return item.name.toLowerCase().includes(input.toLowerCase())
        })
        setDisplayCoin(coins)
    }

    useEffect(() =>{
        setDisplayCoin(allCoin);
    },[allCoin])

  return (
    <div className='home'>
        <div className="hero">
            <h1> Largest <br/>Cryto Marketplace </h1>
            <p>Wecome to the world's largest crytomarket place. Sign up to explore more about crytos</p>

            <form onSubmit={searchHandler}>
                <input onChange={inputHandler} list='coinlist' type="text" placeholder='search cryto..' value={input} required/>

                <datalist id='coinlist'>
                    {allCoin.map((item, index) => (
                        <option key={index} value={item.name} />
                    ))}
                </datalist>

                <button type='submit'>Search</button>
            </form>
        </div>

        <div className="cryto-table">
            <div className="table-layout">
                <p>#</p>
                <p>Coins</p>
                <p>Prices</p>
                <p style={{textAlign: "center"}}>24H Change</p>
                <p className='market-cap'>Market Cap</p>
            </div>
            {displayCoin.slice(0,10).map((item, index)=>(
                <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
                    <p>{item.market_cap_rank}</p>
                    <div>
                        <img src={item.image} alt="" />
                        <p>{item.name + "-" + item.symbol}</p>
                    </div>
                    <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
                    <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
                        {Math.floor(item.price_change_percentage_24h*100)/100}
                    </p>
                    <p className='market-cap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Home
