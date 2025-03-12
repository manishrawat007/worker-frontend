import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid2 } from "@mui/material";
import { signUp } from "@/service/apiUrls";
import { Account, FormContainer, Inputfield, PreviewContainer, SignupButton, StyledButton } from "../login/Login.styled";
import { ChooseImage, Close, CloseContainer, PreviewImage } from "../user/styles/Edit.styled";
import OtpScreen from "./Otp";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const SignUpComponent = () => {
    const [isOtp, setIsOtp] = useState<boolean>(false)
    const [email, setEmail] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [imageUrl1, setImageUrl1] = useState("")
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
            toast.success(`Otp is sent on your ${formData.email}`)
            setIsOtp(true)
        }).catch((err) => {
            toast.error(err.response.data)
        })
    };

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
                                {!imageUrl ?
                                    <Box sx={{ textAlign: "center" }}>
                                        <Inputfield
                                            type="file"
                                            id="upload-button"
                                            style={{ display: "none" }}
                                            {...register("profilePic", { required: "Profile picture is required" })}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                const file = event.target.files?.[0];
                                                if (file) {
                                                    setImageUrl(URL.createObjectURL(file));
                                                }
                                            }}
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
                                    :
                                    <PreviewContainer>
                                        <PreviewImage src={imageUrl} alt="Uploaded Image" />
                                        <CloseContainer onClick={() => setImageUrl('')}>
                                            <Close />
                                        </CloseContainer>
                                    </PreviewContainer>
                                }
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 6, md: 8, lg: 8 }}>
                                {!imageUrl1 ?
                                    <Box sx={{ textAlign: "center" }}>
                                        <Inputfield
                                            type="file"
                                            id="cover-button"
                                            style={{ display: "none" }}
                                            {...register("coverPic", { required: "Cover picture is required" })}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                const file = event.target.files?.[0];
                                                if (file) {
                                                    setImageUrl1(URL.createObjectURL(file));
                                                }
                                            }}
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
                                    :
                                    <PreviewContainer>
                                        <PreviewImage src={imageUrl1} alt="Uploaded Image" />
                                        <CloseContainer onClick={() => setImageUrl1('')}>
                                            <Close />
                                        </CloseContainer>
                                    </PreviewContainer>
                                }
                            </Grid2>
                        </Grid2>

                        <StyledButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Register Your Details
                        </StyledButton>
                    </form>
                        <Account onClick={() => router.push('/')}>Already have an account?<SignupButton> Log in.</SignupButton></Account>
                </Box> :
                <OtpScreen email={email} />}
        </FormContainer>
    );
};

export default SignUpComponent;
