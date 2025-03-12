import { Box, Card, styled, Typography } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    overflow: "auto",
    backgroundColor: theme.palette.background.default,
    padding: "20px",
    borderRadius: "8px",
    margin:"60px 20px",
    boxShadow: "1px 2px 5px gray",
    [theme.breakpoints.down("sm")]: {
        padding:"10px",
    }
}))

export const Heading = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
}))

export const ProfileCard = styled(Box)(({ theme }) => ({
    width: "100%",
    background: theme.palette.background.paper,
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    [theme.breakpoints.down("sm")]: {
        padding:"10px",
    }
}))

export const CustomMainCard = styled(Card)(() => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems:"center",
    padding:"0px 10px",
    borderRadius: "5px",
    cursor:"pointer"
}))

export const CustomCard = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
}))

export const CustomText = styled(Typography)(({theme}) => ({
    fontSize:4* theme.typography.fontSize,
    fontWeight:700
}))

export const Error = styled(Box)(({ theme }) => ({
    textAlign: "center",
    fontSize: 3 * theme.typography.fontSize,
    fontWeight: 500,
    color: "red",
}))
