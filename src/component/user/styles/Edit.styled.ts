import { Avatar, Box, Button, styled, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export const FormContainer = styled(Box)(({ theme }) => ({
    padding: "20px",
    boxShadow: "1px 2px 5px gray",
    borderRadius: "8px",
    backgroundColor: theme.palette.background.default
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
    backgroundColor: "#007bff",
    "&:hover": {
        backgroundColor: "#0056b3",
    },
    fontSize: 4 * theme.typography.fontSize,
    color: theme.palette.text.primary
}))

export const PreviewContainer = styled(Box)(({ theme }) => ({
    position: "relative"
}))

export const PreviewImage = styled('img')(({ theme }) => ({
    borderRadius: '8px',
    width: "100%",
    height: "400px"
}))

export const CloseContainer = styled(Box)(({ theme }) => ({
    position: "absolute",
    right: "20px",
    top: "10px",
    zIndex: 5,
    fontSize: 4 * theme.typography.fontSize,
}))

export const Close = styled(CloseIcon)(({ theme }) => ({
    fontSize: 7 * theme.typography.fontSize,
    cursor: "pointer",
    color: "gray"
}))


export const ResetButton = styled(Button)(({ theme }) => ({
    margin: "15px 0px",
    backgroundColor: "#007bff",
    "&:hover": {
        backgroundColor: "#0056b3",
    },
    fontSize: 4 * theme.typography.fontSize,
    color: theme.palette.text.primary,
    width: "100%",
    border: "none"
}))

export const ChooseImage = styled(Box)(({ theme }) => ({
    padding: "20px",
    border: "2px dotted gray",
    fontSize: 4 * theme.typography.fontSize,
    width: "100%",
    fontWeight: 700,
    cursor: "pointer"
}))