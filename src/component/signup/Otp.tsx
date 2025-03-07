import React, { useState, useRef } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { Inputfield, StyledButton } from "../login/Login.styled";
import { verifyOtp } from "@/service/apiUrls";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const OtpScreen: React.FC<{ email: string }> = ({ email }) => {
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
            email: email
        }
        verifyOtp(payload).then(() => {
            toast.success("Otp verify successfully")
            router.push('/')
        }).catch(() => {
            toast.success("Otp is not verified")
        })

    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={2}>
            <Typography variant="h5">Enter OTP send on your register email.</Typography>
            <Box display="flex" gap={1}>
                {otp.map((digit, index) => (
                    <Inputfield
                        key={index}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        inputRef={(el) => (inputRefs.current[index] = el)}
                        variant="outlined"
                        size="small"
                        inputProps={{
                            maxLength: 1,
                            style: { textAlign: "center", fontSize: 20, width: "40px" },
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
