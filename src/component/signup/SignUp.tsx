import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid2 } from "@mui/material";
import { signUp } from "@/service/apiUrls";
import { FormContainer, Inputfield, StyledButton } from "../login/Login.styled";
import { ChooseImage } from "../user/styles/Edit.styled";
import OtpScreen from "./Otp";

const SignUpComponent = () => {
    const [isOtp, setIsOtp] = useState<boolean>(false)
    const [error, setError] = useState(null)
    const [email,setEmail]=useState("")

    const defaultValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        age: null,
        gender: "",
        skills: "",
        bio: "",
        profilePic: "",
        coverPic: ""
    };

    const { control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues });

    const onSubmit = (formData: any) => {
        const formdata = new FormData()
        formdata.append("firstName", formData.firstName)
        formdata.append("lastName", formData.lastName)
        formdata.append("email", formData.email)
        formdata.append("password", formData.password)
        formdata.append("age", formData.age)
        formdata.append("gender", formData.gender)
        formdata.append("skills", formData.skills.split(', '))
        formdata.append("bio", formData.bio)
        formdata.append("profilePic", formData.profilePic?.[0])
        formdata.append("coverPic", formData.coverPic?.[0])
        signUp(formdata).then(() => {
            setEmail(formData.email)
            setIsOtp(true)
        }).catch((err) => {
            setError(err.response.data)
        })
    };

    return (
        <FormContainer>
            {!isOtp ?
                <Box>
                    <Typography variant="h5" textAlign="center" marginBottom={2}>
                        Register your Details
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
                                            <MenuItem value="male">Male</MenuItem>
                                            <MenuItem value="female">Female</MenuItem>
                                            <MenuItem value="other">Other</MenuItem>
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

                            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                                <Box sx={{ textAlign: "center" }}>
                                    <Inputfield
                                        type="file"
                                        id="upload-button"
                                        style={{ display: "none" }}
                                        {...register("profilePic", { required: "Profile picture is required" })}
                                        error={!!errors.profilePic}
                                        helperText={errors.profilePic?.message}
                                    />
                                    <label htmlFor="upload-button">
                                        <ChooseImage>
                                            Upload Profile picture
                                        </ChooseImage>
                                    </label>
                                    {errors.profilePic && (
                                        <Typography sx={{ color: "red", mt: 1, fontSize: "12px", textAlign: "left" }}>
                                            {errors.profilePic.message}
                                        </Typography>
                                    )}
                                </Box>
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 6, md: 8, lg: 8 }}>
                                <Box sx={{ textAlign: "center" }}>
                                    <Inputfield
                                        type="file"
                                        id="cover-button"
                                        style={{ display: "none" }}
                                        {...register("coverPic", { required: "Cover picture is required" })}
                                        error={!!errors.coverPic}
                                        helperText={errors.coverPic?.message}
                                    />
                                    <label htmlFor="cover-button">
                                        <ChooseImage>
                                            Upload Cover picture
                                        </ChooseImage>
                                    </label>
                                    {errors.coverPic && (
                                        <Typography sx={{ color: "red", mt: 1, fontSize: "12px", textAlign: "left" }}>
                                            {errors.coverPic.message}
                                        </Typography>
                                    )}
                                </Box>
                            </Grid2>
                        </Grid2>

                        <StyledButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Register
                        </StyledButton>
                    </form>
                    {error && <Box sx={{ color: "red", textAlign: "center", margin: "10px 0px" }}>{error}</Box>}
                </Box> :
                <OtpScreen email={email}/>}
        </FormContainer>
    );
};

export default SignUpComponent;
