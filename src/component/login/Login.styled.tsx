import { Box, BoxProps, Button, styled, TextField, Typography } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
    height: '100vh',
    width: '100%',
    background: theme.palette.background.paper,
    position: "relative"
}))

export const InnerComponent = styled(Box)<BoxProps>(({ theme }) => ({
    padding: "20px",
    maxWidth: "400px",
    marginBottom: "50px"
}))

export const LogoContainer = styled(Typography)<{ dark: boolean }>(({ dark }) => ({
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    padding: "20px",
    filter: dark ? "brightness(0) invert(1)" : "brightness(0) saturate(100%) sepia(1) hue-rotate(-20deg) saturate(500%) brightness(1)"
}))

export const Title = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    textAlign: 'center',
    fontSize: 6 * theme.typography.fontSize,
    fontWeight: 800
}))

export const ForgotContainer = styled(Typography)(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-end",
    cursor: "pointer"
}))

export const Forgot = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    textAlign: 'center',
    fontSize: 3 * theme.typography.fontSize,
    fontWeight: 500
}))

export const AccountContainer = styled(Box)(({ theme }) => ({
    position: "absolute",
    bottom: "30px",
    display: "flex",
    justifyContent: "center",
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

export const Inputfield = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        fontSize: 3 * theme.typography.fontSize,
        "& fieldset": {
            borderWidth: "1px solid #DCDCDC",
        },
    },
    "& .MuiOutlinedInput-input": {
        padding: "15px",
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
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: 4 * theme.typography.fontSize,
    textTransform: "capitalize"
}))

export const ImageContainer = styled(Button)(() => ({
    height: "100vh",
    width: "100%",
    backgroundImage: `url('/images/login.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    transition: "transform 0.5s ease-in-out, filter 0.3s ease-in-out",
    filter: " blur(4px)",
    "&:hover": {
        filter: "blur(4px) brightness(1.3)",
    },
}));

export const PreviewContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "200px",
    position: "relative",
    "&:hover": {
        filter: "brightness(0.7)",
    },

    [theme.breakpoints.down("md")]: {
        width: "100%",
        height: "300px"
    }
}))



