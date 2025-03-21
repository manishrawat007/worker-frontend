import { Box, Card, IconButton, styled, Typography } from "@mui/material";

export const Container = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    width: "100%",
    justifyContent: "center"
}))

export const InnerContainer = styled(Box)(({ theme }) => ({
    border: "1px solid #ccc",
    minWidth: "320px",
    height: "90%",
    borderRadius: "10px",
    marginTop: "30px",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    margin:"60px 0px",
    gap: "0px",
    background: theme.palette.background.paper,
    boxShadow: "1px 1px 5px #CCC",
}))

export const HeaderBox = styled(Box)(({ theme }) => ({
    height: "15%",
    background: theme.palette.background.paper,
    borderRadius: "10px 10px 0px 0px",
    boxShadow: "1px 1px 5px #CCC",
    display: "flex",
    justifyContent: "flex-start",
    padding: "5px 20px",
    alignItems: "center",
    gap: "15px"
}))

export const Heading = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary
}))

export const MessageBox = styled(Box)(({ theme }) => ({
    padding: "10px",
    height: "70%",
    overflow: "scroll",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
        display: "none",
    },
}))

export const MessageItem = styled(Typography)<{ sender: boolean }>(({ sender }) => ({
    display: "flex",
    justifyContent: sender ? "flex-end" : "flex-start",
    marginBottom: "10px",
    overflowWrap: "break-word",
    whiteSpace:"normal",
    wordBreak:"break-word",
}))

export const InnerItem = styled(Typography)<{ sender: boolean }>(({ theme, sender }) => ({
    backgroundColor: sender ? theme.palette.primary.main : theme.palette.secondary.main,
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "20px",
    maxWidth: "70%"
}))

export const Time = styled(Typography)(({ theme }) => ({
    display: "block",
    textAlign: "right",
    opacity: 0.7,
    fontSize: 2 * theme.typography.fontSize
}))

export const BottomBox = styled(Typography)(() => ({
    display: "flex",
    alignItems: "center",
    borderTop: "1px solid #ccc",
    padding: "10px",
    height:"15%",
    gap:"5px"
}))

export const CustomIcon = styled(IconButton)(({ theme }) => ({
    minWidth: 5*theme.typography.fontSize, 
    "& svg": { fontSize:5*theme.typography.fontSize}
}))

