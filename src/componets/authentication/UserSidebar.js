import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { CryptoState } from '../../CryptoContext';
import { Avatar, Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { numberWithCommas } from '../banner/Carousel';
import {AiFillDelete} from 'react-icons/ai';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function UserSidebar() {
  const [state, setState] = React.useState({
    right: false,
  });

  const {user, setAlert, watchlist, coins, symbol} = CryptoState()

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logout = ()=>{
    signOut(auth)

    setAlert({
        open: true,
        message: "Logout Successful",
        type: 'success'
      })
      toggleDrawer()
  }

  const removeWatchlist = async (coin) =>{
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

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar onClick={toggleDrawer(anchor, true)}
          style={{
            height: 38,
            width: 38,
            cursor: "pointer",
            backgroundColor:"gold"
          }}
          src={user.photoURL}
          alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >

            <div style = {
                {width: 300,
                padding: 25,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                fontFamily: "ubuntu"}}>

                    <div
                        style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "20px",
                            height: "92%",
                          }}
                    >
                        <Avatar 
                        style={{
                            width: 100,
                            height: 100,
                            cursor: "pointer",
                            backgroundColor: "#EEBC1D",
                            objectFit: "contain",
                          }} 
                        src={user.photoURL} 
                        alt={user.displayName|| user.email}/>
                    <span style={{width: "100%",
                        fontSize: 25,
                        textAlign: "center",
                        fontWeight: "bolder",
                        wordWrap: "break-word"
                    }}>{user.displayName || user.email}</span>
                    
                    <div 
                        style={{
                            flex: 1,
                            width: "100%",
                            backgroundColor: "grey",
                            borderRadius: 10,
                            padding: 15,
                            paddingTop: 10,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 12,
                            overflowY: "scroll",
                          }}
                    >
                  <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                    Watchlist
                  </span>
                  
                  {coins.map(coin =>{
                    if(watchlist.includes(coin.id))
                      return(
                        <div style={{
                          padding: 10,
                          borderRadius: 3,
                          color: "black",
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          backgroundColor: "#EEBC1D",
                          boxShadow: "0 0 3px black",
                        }}>
                          <span>{coin.name}</span>
                          <span style={{display: "flex", gap: 8}}>{symbol}
                            {numberWithCommas(coin.current_price.toFixed(2))}

                            <AiFillDelete
                              style={{cursor: "pointer"}}
                              fontSize="16"
                              onClick={()=> removeWatchlist(coin)}
                            />
                          </span>
                        </div>
                      )
                  })}
                  </div>
                    
                    </div>

                    <Button
                        variant='contained'
                        sx={{
                            height: "8%",
                            width: "100%",
                            backgroundColor: "#EEBC1D",
                            marginTop: 20,
                          }}
                        onClick={logout}
                    >
                        Log Out
                    </Button>
                </div>
            
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}