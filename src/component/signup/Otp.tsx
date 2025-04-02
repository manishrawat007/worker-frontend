import React, { useState, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { Inputfield, StyledButton } from "../login/Login.styled";
import { verifyOtp } from "@/service/apiUrls";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const OtpScreen: React.FC<{ email: string, setIsOtpVerified?: any, forgetScreen?: boolean }> = ({ email, setIsOtpVerified, forgetScreen = false }) => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter()

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
        const target = event.target as HTMLInputElement;
        if (event.key === "Backspace" && !target.value && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = () => {
        const otpValue = otp.join("");
        const payload = {
            otp: otpValue,
            email: email,
            forget:forgetScreen ? true :false
        }
        verifyOtp(payload).then(() => {
            toast.success("Otp verified successfully")
            if (forgetScreen) {
                setIsOtpVerified(true)
            } else {
                router.push('/')
            }
        }).catch(() => {
            toast.error("Invalid or Incorrect Otp")
        })

    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={2}>
            <Typography variant="h5">Enter OTP send on your register email.</Typography>
            <Box>
                {otp?.map((digit, index) => (
                    <Inputfield
                        key={index}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        inputRef={(el) => (inputRefs.current[index] = el)}
                        variant="outlined"
                        size="small"
                        sx={{ marginRight: "10px", marginTop: "5px" }}
                        inputProps={{
                            maxLength: 1,
                            style: { textAlign: "center", width: "40px" },
                        }}
                    />
                ))}
            </Box>
            <StyledButton color="primary" onClick={handleSubmit}>
                Verify OTP
            </StyledButton>
        </Box>
    );
};

export default OtpScreen;
