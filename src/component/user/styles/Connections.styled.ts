import { Box, Card, styled, Typography } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    overflow: "auto",
    backgroundColor: theme.palette.background.default,
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "1px 2px 5px gray"
}))

export const Heading = styled(Typography)(({ theme }) => ({
    marginTop: '20px',
    color: theme.palette.text.primary,
}))

export const ProfileCard = styled(Box)(({ theme }) => ({
    width: "100%",
    background: theme.palette.background.paper,
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
}))

export const CustomCard = styled(Card)(() => ({
    display: "flex",
    alignItems: "center",
    padding: "5px 10px",
    borderRadius: "5px"
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
