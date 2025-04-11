import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid2 } from "@mui/material";
import { signUp } from "@/service/apiUrls";
import { Account, FormContainer, Inputfield, SignupButton, StyledButton } from "../login/Login.styled";
import OtpScreen from "./Otp";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Loader from "@/custom/loader/Loader";

const SignUpComponent = () => {
    const [isOtp, setIsOtp] = useState<boolean>(false)
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const defaultValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        age: null,
        gender: "",
        skills: "",
        bio: "",
    };

    const { control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues });

    const onSubmit = (formData: any) => {
        setIsLoading(true)
        signUp(formData).then(() => {
            setEmail(formData.email)
            toast.success(`Otp is sent on your ${formData.email}`)
            setIsOtp(true)
        }).catch((err) => {
            toast.error(err.response.data.message)
        }).finally(() => {
            setIsLoading(false)
        })
    };

    if (isLoading) {
        return <Loader />
    }

    return (
        <FormContainer>
            {!isOtp ?
                <Box>
                    <Typography variant="h5" textAlign="center" marginBottom={2}>
                        Join thousands of singles looking for real connections
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid2 container spacing={2}>
                            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                                <Inputfield
                                    label="First Name"
                                    fullWidth
                                    margin="normal"
                                    {...register("firstName", { required: "First name is required" })}
                                    error={!!errors.firstName}
                                    helperText={errors.firstName?.message}
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                                <Inputfield
                                    label="Last Name"
                                    fullWidth
                                    margin="normal"
                                    {...register("lastName")}
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                                <Inputfield
                                    label="Email"
                                    fullWidth
                                    margin="normal"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Enter a valid email address",
                                        }
                                    })}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                                <Inputfield
                                    label="Password"
                                    fullWidth
                                    margin="normal"
                                    {...register("password", {
                                        required: "Password is required",
                                        pattern: {
                                            value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                            message:
                                                "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
                                        }
                                    })}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                                <Inputfield
                                    label="Age"
                                    type="number"
                                    fullWidth
                                    margin="normal"
                                    {...register("age", { required: "Age is required" })}
                                    error={!!errors.age}
                                    helperText={errors.age?.message}
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                                <Controller
                                    name="gender"
                                    control={control}
                                    render={({ field }) => (
                                        <Inputfield
                                            select
                                            label="Gender"
                                            fullWidth
                                            margin="normal"
                                            {...field}
                                            {...register("gender", { required: "Gender is required" })}
                                            error={!!errors.gender}
                                            helperText={errors.gender?.message}
                                        >
                                            <MenuItem value="male" sx={{ fontSize: "16px" }}>Male</MenuItem>
                                            <MenuItem value="female" sx={{ fontSize: "16px" }}>Female</MenuItem>
                                            <MenuItem value="other" sx={{ fontSize: "16px" }}>Other</MenuItem>
                                        </Inputfield>
                                    )}
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                                <Inputfield
                                    label="Skills"
                                    fullWidth
                                    margin="normal"
                                    {...register("skills", { required: "Skills are required" })}
                                    error={!!errors.skills}
                                    helperText={errors.skills?.message}
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 6, md: 8, lg: 8 }}>
                                <Inputfield
                                    label="Bio"
                                    fullWidth
                                    margin="normal"
                                    rows={4}
                                    {...register("bio", { required: "Bio is required" })}
                                    error={!!errors.bio}
                                    helperText={errors.bio?.message}
                                />
                            </Grid2>
                        </Grid2>

                        <StyledButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={isLoading}
                        >
                            Register Your Details
                        </StyledButton>
                    </form>
                    <Account>Already have an account?<SignupButton onClick={() => router.push('/')}> Log in.</SignupButton></Account>
                </Box> :
                <OtpScreen email={email} />}
        </FormContainer>
    );
};

export default SignUpComponent;
