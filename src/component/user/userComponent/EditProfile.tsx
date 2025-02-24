import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import { Grid2 } from "@mui/material";
import { editProfile } from "@/service/apiUrls";
import { useUser } from "../context/UserContext";
import { ChooseImage, Close, CloseContainer, FormContainer, InputField, PreviewContainer, PreviewImage, ResetButton, StyledButton } from "../styles/Edit.styled";
import { Heading, ProfileCard } from "../styles/About.styled";

const EditProfile = () => {
    const [error, setError] = useState<String | null>(null)
    const { userData, setUserData } = useUser()
    const [image, setImage] = useState<string | null>(null);

    const defaultValues = {
        firstName: "",
        lastName: "",
        skills: "",
        bio: "",
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({ defaultValues });

    useEffect(() => {
        if (userData) {
            reset({
                firstName: userData?.firstName,
                lastName: userData?.lastName,
                skills: userData?.skills.flat().join(","),
                bio: userData?.bio
            })
        }

    }, [userData?.firstName, userData?.lastName, userData?.skills, userData?.bio, reset])

    const onSubmit = (formData: any) => {
        let payload = {
            skills: formData.skills.split(','),
            bio: formData.bio
        }
        editProfile(payload).then((res) => {
            setUserData((prev: any) => ({ ...prev, bio: res?.data?.bio, skills: res?.data?.skills }))
            reset({
                firstName: res?.data?.firstName,
                lastName: res?.data?.lastName,
                skills: res.data.skills.flat().join(","),
                bio: res.data.bio
            })
        }).catch((err) => {
            setError(err.response.data)
        })
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };

    const handleReset=()=>{
        setImage(null)
    }

    const handleUpload = () => {

    };

    return (
        <FormContainer>
            <Heading variant="h5">Edit Bio and Skills</Heading>
            <ProfileCard>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                            <InputField
                                label="FirstName"
                                fullWidth
                                margin="normal"
                                {...register("firstName", { required: "First name is required" })}
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                                disabled
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                            <InputField
                                label="Last Name"
                                fullWidth
                                margin="normal"
                                {...register("lastName")}
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                                disabled
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                            <InputField
                                label="Skills"
                                fullWidth
                                margin="normal"
                                {...register("skills", { required: "Skills are required" })}
                                error={!!errors.skills}
                                helperText={errors.skills?.message}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid2>

                        <Grid2 size={{ xs: 12, sm: 6, md: 8, lg: 8 }}>
                            <InputField
                                label="Bio"
                                fullWidth
                                margin="normal"
                                rows={4}
                                {...register("bio", { required: "Bio is required" })}
                                error={!!errors.bio}
                                helperText={errors.bio?.message}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid2>
                    </Grid2>

                    <StyledButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Edit Details
                    </StyledButton>
                </form>
                {error && <Box sx={{ color: "red", textAlign: "center" }}>{error}</Box>}
            </ProfileCard>
            <Heading variant="h5">Upload a Image</Heading>
            <ProfileCard >
                {image ? (
                    <Box>
                        <PreviewContainer>
                            <PreviewImage src={image} alt="Uploaded Image" />
                            <CloseContainer onClick={handleReset}>
                                <Close/>
                            </CloseContainer>
                        </PreviewContainer>
                        <ResetButton onClick={handleUpload} variant="outlined">
                            Upload Image
                        </ResetButton>
                    </Box>
                ) : (
                    <Box sx={{ textAlign: "center", padding: 2 }}>
                        <input
                            accept="image/*"
                            type="file"
                            id="upload-button"
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                        />
                        <label htmlFor="upload-button">
                            <ChooseImage>
                                Upload Image
                            </ChooseImage>
                        </label>
                    </Box>)}
            </ProfileCard>
        </FormContainer>
    );
};

export default EditProfile;
