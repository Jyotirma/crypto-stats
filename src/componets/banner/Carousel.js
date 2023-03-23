import React, { useEffect, useState } from 'react'
import './Carousel.css'
import axios from 'axios' 
import { CryptoState } from "../../CryptoContext"
import { TrendingCoins } from "../../config/api"
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom'

export const numberWithCommas= (x)=>{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
    const [trending, setTrending] = useState([])
const {currency, symbol}=CryptoState()

const items = trending.map((coin)=>{
    let profit = coin.price_change_percentage_24h > 0
    return(
        <Link
            className="carouselItem"
            to={`/coins/${coin.id}`}>
                <img
                    src={coin?.image}
                    alt={coin.name}
                    height="80"
                    style={{marginBottom: 10}}
                />
                <span>{coin?.symbol} 
                <span style={{color: profit>0? "green":"red", fontWeight: 500}}>{profit && ' +'}{coin?.price_change_percentage_24h?.toFixed(2)}%
                </span>
                </span> 
                <span> 
                     {symbol}{numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
    )
})

const responsive ={
    0: {
        items: 2,
    },

    712: {
        items: 4,
    },
}

    const fetchTrendingCoins = async () =>{
        const { data } = await axios.get(TrendingCoins(currency))

        setTrending(data);
    }

    console.log(trending);

    useEffect(()=>{
        fetchTrendingCoins();
    },[currency])

  return (
    <div className="carousel">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  )
}

export default Carousel
