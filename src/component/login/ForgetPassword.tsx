import { useState } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { Account, AccountContainer, ProfileCard, SignupButton } from "./ForgetPassword.styled";
import OtpScreen from "../signup/Otp";
import { useRouter } from "next/router";
import { Inputfield } from "./Login.styled";
import { changePassword, forgetPassword } from "@/service/apiUrls";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export type FormData = {
    password: string;
    confirmpassword: string
};

const ForgetPassword = () => {
    const [email, setEmail] = useState<string>("");
    const [isOtp, setIsOtp] = useState<boolean>(false)
    const [error, setError] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false)
    const router = useRouter()
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();

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

    const handleSubmitEmail = (e: React.FormEvent) => {
        e.preventDefault();
        let payload = {
            email
        }
        forgetPassword(payload).then(() => {
            setIsOtp(true)
        }).catch((error) => {
            toast.error(error.response.data.error)
        })
    };

    const onSubmit = (data: FormData) => {
        let payload = {
            email,
            password: data.password
        }
        changePassword(payload).then(() => {
            toast.success("Password is Changed Successfully")
            router.push('/')
        }).catch((error) => {
            toast.error(error.response.data.error)
        })
    }

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
                    <Inputfield
                        fullWidth
                        label="Email"
                        variant="outlined"
                        type="email"
                        value={email}
                        onChange={handleChange}
                    />
                    <p style={{ color: "red", fontSize: "15px", margin: "2px 0px 10px", width: "100%" }}>{error}</p>
                    <Button onClick={handleSubmitEmail} variant="contained" fullWidth sx={{ fontSize: "14px" }} disabled={!isValid}>
                        Send Otp
                    </Button>

                    <AccountContainer>
                        <Account>Remember your password? <SignupButton onClick={() => router.push('/')}>Login here</SignupButton></Account>
                    </AccountContainer>
                </ProfileCard>
                :
                <ProfileCard>
                    {!isOtpVerified ?
                        <OtpScreen email={email} setIsOtpVerified={setIsOtpVerified} forgetScreen={true} />
                        :
                        <Box>
                            <Typography variant="body2" mb={2}>
                                Change your Password.
                            </Typography>
                            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>

                                <Inputfield
                                    label="New Password"
                                    type="password"
                                    fullWidth
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 8,
                                            message: 'Password must be at least 8 characters long',
                                        },
                                        pattern: {
                                            value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                                            message: 'Password must contain at least one number, one uppercase letter, one special character, and be at least 8 characters long.',
                                        },
                                    })}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    margin="normal"
                                />

                                <Inputfield
                                    label="Confirm Password"
                                    type="password"
                                    fullWidth
                                    {...register('confirmpassword', {
                                        required: 'Confirm Password is required',
                                        validate: (value) =>
                                            value === watch('password') || 'Passwords do not match',
                                    })}
                                    error={!!errors.confirmpassword}
                                    helperText={errors.confirmpassword?.message}
                                    margin="normal"
                                />

                                <Button type="submit" variant="contained" fullWidth sx={{ fontSize: "14px" }} disabled={!isValid}>
                                    Change Password
                                </Button>
                            </form>
                        </Box>}
                </ProfileCard>}
        </Container>
    )
}
export default ForgetPassword