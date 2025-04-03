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
    const [imageUrl, setImageUrl] = useState<File | null>(null)
    const [imageUrl1, setImageUrl1] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [error1, setError1] = useState('')
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
        setIsLoading(true)
        const formdata = new FormData()
        formdata.append("firstName", formData.firstName)
        formdata.append("lastName", formData.lastName)
        formdata.append("email", formData.email)
        formdata.append("password", formData.password)
        formdata.append("age", formData.age)
        formdata.append("gender", formData.gender)
        formdata.append("skills", formData.skills.split(', '))
        formdata.append("bio", formData.bio)
        if (imageUrl) {
            formdata.append("profilePic", imageUrl)
        }
        if (imageUrl1) {
            formdata.append("coverPic", imageUrl1)
        }
        signUp(formdata).then(() => {
            setEmail(formData.email)
            toast.success(`Otp is sent on your ${formData.email}`)
            setIsOtp(true)
        }).catch((err) => {
            toast.error(err.response.data.message)
        }).finally(() => {
            setIsLoading(false)
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
                                                    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
                                                    if (!allowedTypes.includes(file.type)) {
                                                        setError("Only images (JPEG, PNG, GIF, WebP) are allowed.");
                                                        setImageUrl(null)
                                                        return;
                                                    } else {
                                                        setImageUrl(file);
                                                    }
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
                                        {(errors.profilePic || error) && (
                                            <Typography sx={{ color: "red", mt: 1, fontSize: "12px", textAlign: "left" }}>
                                                {errors?.profilePic?.message || error}
                                            </Typography>
                                        )}
                                    </Box>
                                    :
                                    <PreviewContainer>
                                        <PreviewImage src={URL.createObjectURL(imageUrl)} alt="Uploaded Image" />
                                        <CloseContainer onClick={() => setImageUrl(null)}>
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
                                            inputProps={{ accept: "image/*" }}
                                            style={{ display: "none" }}
                                            {...register("coverPic", { required: "Cover picture is required" })}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                const file = event.target.files?.[0];
                                                if (file) {
                                                    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
                                                    if (!allowedTypes.includes(file.type)) {
                                                        setError1("Only images (JPEG, PNG, GIF, WebP) are allowed.");
                                                        setImageUrl1(null)
                                                        return;
                                                    } else {
                                                        setImageUrl1(file);
                                                    }
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
                                        {(errors.coverPic || error1) && (
                                            <Typography sx={{ color: "red", mt: 1, fontSize: "12px", textAlign: "left" }}>
                                                {errors?.coverPic?.message || error1}
                                            </Typography>
                                        )}
                                    </Box>
                                    :
                                    <PreviewContainer>
                                        <PreviewImage src={URL.createObjectURL(imageUrl1)} alt="Uploaded Image" />
                                        <CloseContainer onClick={() => setImageUrl1(null)}>
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
