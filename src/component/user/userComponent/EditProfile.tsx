import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import { Grid2 } from "@mui/material";
import { editProfile, uploadPost } from "@/service/apiUrls";
import { useUser } from "../context/UserContext";
import { ButtonsContainer, ChooseImage, Close, CloseContainer, FormContainer, Heading, InputField, PostContainer, PreviewContainer, PreviewImage, ProfileCard, ResetButton, StyledButton } from "../styles/Edit.styled";
import { Inputfield } from "@/component/login/Login.styled";
import { toast } from "react-toastify";

const EditProfile = () => {
    const [error, setError] = useState<String | null>(null)
    const { userData, setUserData } = useUser()
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [message, setMessage] = useState<string>('Image');

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
                skills: userData?.skills?.flat().join(","),
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
            toast.success("User details updated successfully")
            setUserData((prev: any) => ({ ...prev, bio: res?.data?.bio, skills: res?.data?.skills }))
            reset({
                firstName: res?.data?.firstName,
                lastName: res?.data?.lastName,
                skills: res.data.skills.flat().join(","),
                bio: res.data.bio
            })
        }).catch((err) => {
            toast.error(err.response.data)
            setError(err.response.data)
        })
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL?.createObjectURL(file)
            setImage(file);
            setImageUrl(url)
        }
    };

    const handleReset = () => {
        setImage(null)
        setImageUrl(null)
    }

    const handleUpload = () => {
        let formData = new FormData()
        if (image instanceof File) {
            formData.append("image", image);
        }
        if (typeof message === "string") {
            formData.append("message", message);
        }
        uploadPost(formData).then((res) => {
            setImage(null);
            setImageUrl(null)
            toast.success(`Post uploaded successfully`)
        }).catch((err) => {
            toast.error(`Post is not uploaded`)
            console.log("error----------", err.message)
        })
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
            <Heading variant="h5">Upload a Post</Heading>
            <ProfileCard >
                {imageUrl ? (
                    <PostContainer>
                        <PreviewContainer>
                            <PreviewImage src={imageUrl} alt="Uploaded Image" />
                            <CloseContainer onClick={handleReset}>
                                <Close />
                            </CloseContainer>
                        </PreviewContainer>
                        <ButtonsContainer>
                            <Inputfield
                                label="Message"
                                fullWidth
                                margin="normal"
                                rows={4}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />
                            <ResetButton onClick={handleUpload} variant="outlined">
                                Upload Post
                            </ResetButton>
                        </ButtonsContainer>
                    </PostContainer>
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
                                Upload a Post
                            </ChooseImage>
                        </label>
                    </Box>)}
            </ProfileCard>
        </FormContainer>
    );
};

export default EditProfile;
