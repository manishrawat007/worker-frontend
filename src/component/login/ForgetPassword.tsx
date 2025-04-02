import { useState } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { Account, AccountContainer, ProfileCard, SignupButton } from "./ForgetPassword.styled";
import OtpScreen from "../signup/Otp";
import { useRouter } from "next/router";
import { Inputfield } from "./Login.styled";

const ForgetPassword = () => {
    const [email, setEmail] = useState<string>("");
    const [isOtp, setIsOtp] = useState<boolean>(false)
    const [error, setError] = useState("");
    const [isValid, setIsValid] = useState(false);
    const router = useRouter()

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setEmail(inputValue);

        if (!inputValue) {
            setError("Email is required!");
            setIsValid(false);
        } else if (!emailRegex.test(inputValue)) {
            setError("Please enter a valid Email.");
            setIsValid(false);
        } else {
            setError("");
            setIsValid(true);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsOtp(true)
    };

    return (
        <Container>
            {!isOtp ?
                <ProfileCard>
                    <Typography variant="h5" gutterBottom>
                        Forgot Password
                    </Typography>
                    <Typography variant="body2" mb={2}>
                        Enter your email to receive a OTP.
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                        <Inputfield
                            fullWidth
                            label="Email"
                            variant="outlined"
                            type="email"
                            value={email}
                            onChange={handleChange}
                        />
                        <p style={{ color: "red", fontSize: "15px", margin: "2px 0px 10px" }}>{error}</p>
                        <Button type="submit" variant="contained" fullWidth sx={{ fontSize: "12px" }} disabled={!isValid}>
                            Send Otp
                        </Button>
                    </form>

                    <AccountContainer>
                        <Account>Remember your password? <SignupButton onClick={() => router.push('/')}>Login here</SignupButton></Account>
                    </AccountContainer>
                </ProfileCard>
                :
                <ProfileCard>
                    <OtpScreen email={"manish"} />
                </ProfileCard>}
        </Container>
    )
}
export default ForgetPassword