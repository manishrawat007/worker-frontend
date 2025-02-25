import { Box, Button, ListItem, ListItemText, styled, Typography } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    overflow: "auto",
    backgroundColor: theme.palette.background.default,
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "1px 2px 5px gray",
    [theme.breakpoints.down("sm")]: {
        padding:"10px",
    }
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
    [theme.breakpoints.down("sm")]: {
        padding:"10px",
    }
}))

export const CustomListItem = styled(ListItem)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap:"20px",
    padding: "2px",
}))

export const RequestContainer = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
}))

export const RequestText = styled(ListItemText)(({ theme }) => ({
    "& .MuiTypography-root": {
        fontSize: 4 * theme.typography.fontSize,
        fontWeight:700
    }
}))

export const ButtonContainer = styled(Box)(({theme}) => ({
    display: "flex",
    justifyContent:"flex-end",
    flexDirection:"row",
    gap:"10px",
    [theme.breakpoints.down("sm")]: {
        flexDirection:"column",
    }
}))

export const Accept = styled(Button)(({ theme }) => ({
    backgroundColor: "#4caf50",
    color: "#fff",
    fontSize: 4 * theme.typography.fontSize,
    textAlign:"left",
    textTransform:"none"
}))

export const Reject = styled(Button)(({ theme }) => ({
    borderColor: "#f44336",
    color: "#f44336",
    fontSize: 4 * theme.typography.fontSize,
    textAlign:"left",
    textTransform:"none"
}))


