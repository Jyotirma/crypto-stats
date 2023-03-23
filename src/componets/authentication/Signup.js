import { createUserWithEmailAndPassword } from "@firebase/auth"
import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { CryptoState } from '../../CryptoContext'
import{auth} from "../../firebase"

const Signup = ({handleClose}) => {
  const [email, setEmail] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [password, setPassword] = useState("")

  const {setAlert} = CryptoState();

  const handleSubmit = async ()=>{
    if(password!== confirmPassword){
      setAlert({
        open: true,
        message: 'Password do not match',
        type: 'error'
      })
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
        )

        console.log("result",result);
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${result.user.email}`,
          type: 'success'
        })

        handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error'
      })
    }
  }


  return (
    <Box 
    style={{display: "flex", flexDirection: "column", gap: "20px", padding: 5}}
    >
      <TextField
        variant='outlined'
        type="email"
        label="Enter email"
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
        style={{marginTop: "10px"}}
      ></TextField>
      <TextField
        variant='outlined'
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
        p={2}
      ></TextField>
      <TextField
        variant='outlined'
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e)=> setConfirmPassword(e.target.value)}
        p={2}
      ></TextField>

      <Button
        variant='contained'
        size='large'
        style={{backgroundColor: "gold"}}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
      
    </Box>
  )
}

export default Signup
