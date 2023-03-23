import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import { CryptoState } from '../../CryptoContext'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import { async } from '@firebase/util'


const Login = ({handleClose}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {setAlert} = CryptoState()

  const handleSubmit = async()=>{
    if(!email || !password){
      setAlert({
        open: true,
        message: 'Please fill all the fields',
        type: 'error'
      })
      return;
    }

    try {

      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      setAlert({
        open: true,
        message: `LogIn Successful. Welcome ${result.user.email}`,
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
     

      <Button
        variant='contained'
        size='large'
        style={{backgroundColor: "gold"}}
        onClick={handleSubmit}
      >
        LogIn
      </Button>
      
    </Box>
  )
}

export default Login
