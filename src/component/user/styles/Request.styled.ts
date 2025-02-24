import { Box, Button, ListItem, ListItemText, styled, Typography } from "@mui/material";

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

export const CustomListItem = styled(ListItem)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2,
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

export const Accept = styled(Button)(({ theme }) => ({
    marginRight: "10px", 
    backgroundColor: "#4caf50",
    color: "#fff",
    fontSize: 4 * theme.typography.fontSize
}))

export const Reject = styled(Button)(({ theme }) => ({
    borderColor: "#f44336",
    color: "#f44336",
    fontSize: 4 * theme.typography.fontSize
}))


