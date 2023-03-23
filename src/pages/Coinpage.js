import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
import { SingleCoin } from '../config/api';
import CoinInfo from '../componets/CoinInfo';
import { styled } from '@mui/material/styles';
import { Typography, LinearProgress, Button } from '@mui/material';
import { numberWithCommas } from '../componets/banner/Carousel';
import parse from 'html-react-parser'
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Coinpage = () => {
  const {id} = useParams();
  const  [coin, setCoin] = useState()
  const {currency, symbol, user, watchlist, setAlert} = CryptoState();

  const fetchCoin = async ()=>{
    const { data } = await axios.get(SingleCoin(id))
    setCoin(data)
  }
  console.log(coin);
  useEffect(()=>{
    fetchCoin();
  },[])


  const MainCont = styled('div')(({ theme })=>({
    display: 'flex',
    color: "white",
    [theme.breakpoints.down('md')]: {
      flexDirection: "column",
      alignItems: "center"
    }
  }))
  const Sidebar = styled('div')(({ theme })=>({
    width: "30%",
    display: 'flex',
    flexDirection: "column",
    [theme.breakpoints.down('md')]: {
      width: "100%"
    },
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey"
  }))

  const Marketdata = styled('div')(({ theme })=>({
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down('md')]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("sm")]:{
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down('xs')]: {
      alignItems: "start",
    }
  }))

  const inWatchList = watchlist.includes(coin?.id)

  const addToWatchList = async () =>{
    const coinRef = doc(db, "watchlist", user.uid)

    try {
      await setDoc(coinRef,
        {coins: watchlist?[...watchlist, coin?.id]: [coin?.id]
        })

        setAlert({
          open: true,
          message: `${coin.name} Added to watchlist !`,
          type: 'success'
        })
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error'
      })
    }
  }
  const removeWatchlist = async () =>{
    const coinRef = doc(db, "watchlist", user.uid)

    try {
      await setDoc(coinRef,
        {coins: watchlist.filter((watch)=> watch !== coin?.id)},
        {merge: "true"}
        )

        setAlert({
          open: true,
          message: `${coin.name} removed from watchlist !`,
          type: 'success'
        })
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error'
      })
    }
  }

  if(!coin) return <LinearProgress style={{backgroundColor: "gold"}}></LinearProgress>

  return (
    <MainCont>
      <Sidebar>
        <img
          src={coin?.image.large}  
          alt={coin?.name}
          height='150'
          style={{marginBottom: 20}}
        />
        <Typography 
        variant="h3"
        style={{fontWeight: 'bold', marginBottom: 20, fontFamily:'ubuntu', paddingLeft: 15}}
        >
          {coin?.name}</Typography>
          <Typography variant='subtitle1'
            style={{
              width: "100%",
              fontFamily: 'ubuntu',
              padding: 25,
              paddingBottom: 15,
              paddingTop: 0,
              textAlign: "justify"
          }}
          >{parse(coin?.description.en.split(". ")[0]).toString()}. </Typography>
          <Marketdata>
            <span style={{display:"flex"}}>
              <Typography variant='h5'>Rank: </Typography>
              &nbsp;
              &nbsp;
              <Typography variant='h5'> {coin?.market_cap_rank}</Typography>
            </span>
            <span style={{display:"flex"}}>
              <Typography variant='h5'>Current Price: </Typography>
              &nbsp;
              &nbsp;
              <Typography variant='h5'> {symbol}{" "} {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}</Typography>
            </span>
            <span style={{display:"flex"}}>
              <Typography variant='h5'>Market Cap: </Typography>
              &nbsp;
              &nbsp;
              <Typography variant='h5'> {symbol}{" "} {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M</Typography>
            </span>

            {user && (<Button
                variant='outlined'
                style={{
                  width: "100%",
                  height: 40,
                  backgroundColor: inWatchList ? "red" : "gold",
                  color: "black",
                  marginTop: 10
                }}
                onClick={inWatchList? removeWatchlist : addToWatchList}
            > {inWatchList? "Remove from WatchList":"Add To WatchList"}  
            </Button>)}
          </Marketdata>
      </Sidebar>
      <CoinInfo coin={coin}/>
    </MainCont>
  )
}

export default Coinpage
