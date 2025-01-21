import { Box, styled, Typography } from "@mui/material";

export const Container = styled(Box)({
    display:'flex',
    justifyContent:"center",
    alignItems:'center',
    height: '100vh',
    width:'100vw',
})

export const Title =styled(Typography)({
    color:"primary",
    textAlign:'center',
    fontSize:'20px',
    fontFamily:'montserrat',
    fontWeight:600
})

