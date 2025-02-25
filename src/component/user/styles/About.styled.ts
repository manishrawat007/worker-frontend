import { Box, Chip, Stack, styled, Typography } from "@mui/material";


export const UserDetailsBox = styled(Box)(({ theme }) =>({
    padding: "20px",
    boxShadow: "1px 2px 5px gray",
    borderRadius: "8px",
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down("sm")]: {
        padding:"10px",
    }
}))

export const ProfileCard = styled(Box)(({theme})=>({
    width: "100%",
    background: theme.palette.background.paper,
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    [theme.breakpoints.down("sm")]: {
        padding:"10px",
    }
}))

export const HighlightText = styled(Typography)(({ theme }) => ({
    fontSize:4*theme.typography.fontSize,
    color:theme.palette.text.primary
}))

export const Heading = styled(Typography)(({theme}) => ({
    marginTop: '20px',
    color:theme.palette.text.primary
}))

export const Text = styled(Typography)(({ theme }) => ({
    fontSize:3*theme.typography.fontSize,
    color:theme.palette.text.primary
}))

export const CustomChip = styled(Chip)(({ theme }) => ({
    fontSize:3*theme.typography.fontSize,
}))

export const SkillsContainer = styled(Stack)(() => ({
    display:"flex",
    justifyContent:"flex-start",
    overflowX: "auto",
    whiteSpace: "nowrap",
    gap:"10px",
    width:"100%",
    margin:"0px 0px 10px",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
        display: "none",
    },
}))