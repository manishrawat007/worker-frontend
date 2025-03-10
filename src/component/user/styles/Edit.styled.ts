import { Avatar, Box, Button, styled, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Padding } from "@mui/icons-material";

export const FormContainer = styled(Box)(({ theme }) => ({
    padding: "20px",
    boxShadow: "1px 2px 5px gray",
    borderRadius: "8px",
    backgroundColor: theme.palette.background.default,
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
    overflowY: "auto",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },

    [theme.breakpoints.down("sm")]: {
        padding:"10px",
    }
}))

export const InputField = styled(TextField)(({ theme }) => ({
    "& .MuiFormHelperText-root": {
        fontSize: 3 * theme.typography.fontSize,
        color: "red",
        margin: 0
    },
    "& label": { fontSize: 3 * theme.typography.fontSize },
    "& input": { fontSize: 3 * theme.typography.fontSize },
    "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: theme.palette.primary, borderWidth: "1px" },
        "&.Mui-focused fieldset": { borderColor: theme.palette.primary },
    },
    "& .MuiInputLabel-shrink": {
        fontSize: 4 * theme.typography.fontSize,
        transform: `translate(${4 * theme.typography.fontSize}, -4px) scale(1)`,
        backgroundColor: theme.palette.background.paper,
        padding: "0 4px",
    },
}))

export const StyledButton = styled(Button)(({ theme }) => ({
    margin: "15px 0px",
    backgroundColor: theme.palette.primary.main,
    fontSize: 4 * theme.typography.fontSize,
    color: theme.palette.common.white,
    textTransform:"none"
}))

export const PostContainer = styled(Box)(({ theme }) => ({
    display:"flex",
    justifyContent:"flex-start",
    flexDirection:"row",
    gap:"40px",
    marginBottom:"30px",

    [theme.breakpoints.down("md")]: {
        flexDirection:"column",
        gap:"10px"
    }
}))


export const PreviewContainer = styled(Box)(({ theme }) => ({
    position: "relative",
    width:"50%",
    height:"400px",
    "&:hover": {
        filter: "brightness(0.7)",
    },

    [theme.breakpoints.down("md")]: {
        width:"100%",
        height:"300px"
    }
}))

export const PreviewImage = styled('img')(({ theme }) => ({
    borderRadius: '8px',
    width: "100%",
    height: "100%",
}))

export const ButtonsContainer = styled(Box)(({ theme }) => ({
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    gap:"5px",
    width:"50%",
    [theme.breakpoints.down("md")]: {
        width:"100%",
    }
}))

export const CloseContainer = styled(Box)(({ theme }) => ({
    position: "absolute",
    right: "20px",
    top: "10px",
    zIndex: 10,
    fontSize: 4 * theme.typography.fontSize,
}))

export const Close = styled(CloseIcon)(({ theme }) => ({
    fontSize: 7 * theme.typography.fontSize,
    cursor: "pointer",
    color: "gray"
}))


export const ResetButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    fontSize: 4 * theme.typography.fontSize,
    color: theme.palette.common.white,
    width: "100%",
    border: "none",
    textTransform:"none"
}))

export const ChooseImage = styled(Box)(({ theme }) => ({
    padding: "20px",
    border: `2px dotted ${theme.palette.primary.main}`,
    fontSize: 4 * theme.typography.fontSize,
    width: "100%",
    fontWeight: 700,
    cursor: "pointer",
    color:theme.palette.text.primary
}))