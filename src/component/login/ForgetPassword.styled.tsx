import { Box, styled, Typography } from "@mui/material";

export const ProfileCard = styled(Box)(({ theme }) => ({
    width: "100%",
    height:"auto",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    margin:"40px 0px",
    background: theme.palette.background.paper,
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    [theme.breakpoints.down("sm")]: {
        padding: "10px",
    }
}))

export const AccountContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems:"center",
    margin:"20px 0px 0px"
}))

export const Account = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    textAlign: 'center',
    fontSize: 4 * theme.typography.fontSize,
    fontWeight: 500,
}))

export const SignupButton = styled("span")(({ theme }) => ({
    color: theme.palette.text.primary,
    fontSize: 4 * theme.typography.fontSize,
    fontWeight: 700,
    cursor: "pointer"
}))