// import { makeStyles } from '@mui/material'
import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react'
import './Banner.css'
import Carousel from './Carousel';



const Banner = () => {
  return (
    <div className='banner'>
      <Container className='bannercont'>
      <div className='tagline'>
        <Typography
            variant='h2'
            style={{
                fontWeight: "bold",
                marginBottom: 15,
                fontFamily: 'ubuntu',
            }}
        >
            CryptoStats
        </Typography>

        <Typography
            variant='subtitle2'
            style={{
                color: "darkgray",
                fontFamily: 'ubuntu'
            }}
        >
            GET ALL THE INFO REGARDING YOUR FAVORITE CRYPTO CURRENCY
        </Typography>

      </div>
      <Carousel/>
      </Container>
    </div>
  )
}

export default Banner
