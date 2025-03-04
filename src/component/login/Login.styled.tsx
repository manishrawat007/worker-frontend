import { Box, BoxProps, Button, styled, TextField, Typography } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    background: theme.palette.background.default
}))

export const InnerComponent = styled(Box)<BoxProps>(({ theme }) => ({
    maxWidth: "400px",
    margin: 'auto',
    padding: "20px",
    boxShadow: "1px 2px 5px gray",
    borderRadius: "10px",
    width: "400px",
    background: theme.palette.background.paper
}))

export const Title = styled(Typography)(({theme})=>({
    color: "primary",
    textAlign: 'center',
    fontSize: 5* theme.typography.fontSize,
    fontWeight: 600
}))

export const Account = styled(Typography)(({theme})=>({
    color: theme.palette.text.secondary,
    textAlign: 'center',
    fontSize: 4 * theme.typography.fontSize,
    fontWeight: 400,
}))

export const SignupButton = styled("span")(({theme})=>({
    color: "primary",
    fontSize: 4 * theme.typography.fontSize,
    fontWeight: 700,
    cursor: "pointer"
}))

export const Inputfield = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        fontSize: 4 * theme.typography.fontSize,
        "& fieldset": {
            borderWidth: "1px solid #DCDCDC",
        },
    },
    "& .MuiInputBase-input": {
        fontSize: 4 * theme.typography.fontSize,
    },
    "& .MuiInputLabel-root": {
        fontSize: 3 * theme.typography.fontSize,
        top: "0px",
        left: "14px",
        transform: "translate(0, 20px) scale(1)",
    },
    "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-shrink": {
        fontSize: 3 * theme.typography.fontSize,
        transform: "translate(0, -6px) scale(0.85)",
        background: theme.palette.background.paper,
        padding: "0 4px",
    },
    "& .MuiFormHelperText-root": {
        fontSize: 3 * theme.typography.fontSize,
    },
    "& .MuiFormHelperText-root.Mui-error": {
        marginLeft: "0px"
    }
}))

export const FormContainer = styled(Box)(({ theme }) => ({
    margin: "40px",
    padding: "20px",
    boxShadow: "1px 2px 5px gray",
    borderRadius: "8px",
    backgroundColor: theme.palette.background.paper,
}))

export const StyledButton = styled(Button)(({ theme }) => ({
    margin: "15px 0px 15px",
    padding: "5px",
    backgroundColor: "#007bff",
    color: theme.palette.text.primary,
    fontSize: 4 * theme.typography.fontSize,
    "&:hover": {
        backgroundColor: "#0056b3",
    },
    textTransform:"capitalize"

}))



