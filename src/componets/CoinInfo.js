import styled from '@emotion/styled'
import { CircularProgress } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { HistoricalChart } from '../config/api'
import { CryptoState } from '../CryptoContext'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import { chartDays } from '../config/data'
import SelectBtn from './SelectBtn'
// import SelectBtn from './SelectBtn'
ChartJS.register(LineElement, PointElement, LinearScale,CategoryScale, Title);



const CoinInfo = ({coin}) => {

  const [historicData, setHistoricData]=useState()
  const [days, setDays]=useState(1)

  const {currency} = CryptoState();

  const fetchHistoricData = async()=>{
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));

    setHistoricData(data.prices)
  }
  console.log("data",historicData);

  useEffect(()=>{
    // eslint-disable-next-lin
    fetchHistoricData();
  },[days])

  const darkTheme = createTheme({
    palette: {
        primary:{
            main: "#fff"
        },
      mode: 'dark',
    },
  });


  const Cont = styled('div')(({ theme })=>({
    display: 'flex',
    width:"75%",
    color: "white",
    flexDirection: "column",
    alignItems: "center",
    justifyContent:"center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down('md')]: {
      width:"100%",
      marginTop: 0,
      padding: 20,
    }
  }))

  // const data = { 
  //   labels: historicData.map((coin) => {
  //     let date = new Date(coin[0]);
  //     let time =
  //       date.getHours() > 12
  //         ? `${date.getHours() - 12}:${date.getMinutes()} PM`
  //         : `${date.getHours()}:${date.getMinutes()} AM`;
  //     return days === 1 ? time : date.toLocaleDateString();
  //   }),

  //   datasets: [
  //     {
  //       data: historicData.map((coin) => coin[1]),
  //       label: `Price  Past ${days} Days  in ${currency}`,
  //       borderColor: "white",
  //     },
  //   ],
  // }

  const options= {
    elements: {
      point:{
        radius: 1,
      },
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Cont>
        {/* chart */}
        {!(historicData)?(<CircularProgress
          style={{color:"gold"}}
          size={200}
          thickness={1}/>):(<>
          
          <Line
             data={{ 
              labels: historicData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
          
              datasets: [
                {
                  data: historicData.map((coin) => coin[1]),
                  label: `Price  Past ${days} Days  in ${currency}`,
                  borderColor: "gold",
                },
              ],
            }} options= {options}>
          </Line>
          </>)
          }
        {/* buttons */}

        <div
          style={{
            display: "flex",
            marginTop: 20,
            justifyContent: "space-around",
            width: "100%"
          }}
        >
          {chartDays.map((day)=>(
            <SelectBtn
              onClick={()=> setDays(day.value)}
              selected={day.value === days}
            >{day.label}</SelectBtn>
          ))}
        </div>
        
      </Cont>
    </ThemeProvider>
  )
}

export default CoinInfo
