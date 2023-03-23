import React from 'react'
import { AppBar, Container, createTheme, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@mui/material'
import { useNavigate } from "react-router-dom"
import { CryptoState } from '../CryptoContext'
import AuthModal from './authentication/AuthModal'
import UserSidebar from './authentication/UserSidebar'

const Header = () => {

    const navigate = useNavigate()

    const { currency, setCurrency, user } = CryptoState()
    console.log(currency);

    const darkTheme = createTheme({
        palette: {
            primary:{
                main: "#fff"
            },
          mode: 'dark',
        },
      });


  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
            <Toolbar>
                <Typography
                    onClick = {()=> navigate("/")}
                    color="gold"
                    fontWeight="bold"
                    fontFamily="Ubuntu"
                    fontSize='1.5rem'
                    style={{cursor: "pointer", flex: 1}}
                >
                    CryptoStats</Typography> 
                <Select variant='outlined'
                    style={{
                        width: 100,
                        height: 40,
                        marginRight:15,
                        borderColor: "green"
                    }}
                    value={currency}
                    onChange={(e)=> setCurrency(e.target.value)}
                >
                    <MenuItem value={"INR"}>INR</MenuItem>
                    <MenuItem value={"USD"}>USD</MenuItem>
                </Select>
                {user ? <UserSidebar/> : <AuthModal/>}
            </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header
