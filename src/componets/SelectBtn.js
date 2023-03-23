import styled from '@emotion/styled'
import React from 'react'

const SelectBtn = ({children, selected, onClick}) => {
  const Span = styled('span')(({ theme })=>({
     border: "1px solid gold",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "ubuntu", 
      cursor: "pointer",
      backgroundColor: selected ? "gold" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "gold",
        color: "black",
      },
      width: "22%",
      [theme.breakpoints.down('md')]: {
        width:"100%",
        flexDirection: "column",
        margin: 5
      },
    
  }))

  return (
    <Span onClick={onClick}>
      {children}
    </Span>
  )
}

export default SelectBtn
