import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import { Grid2 } from "@mui/material";
import { editProfile } from "@/service/apiUrls";
import { useUser } from "../context/UserContext";
import { FormContainer, Heading, ProfileCard, StyledButton } from "../styles/Edit.styled";
import { toast } from "react-toastify";
import { Inputfield } from "@/component/login/Login.styled";

type EditFormFields = {
    firstName: string;
    lastName: string;
    skills: string;
    bio: string;
};

type PasswordFormFields = {
    currentPassword: string;
    newPassword: string;
    verifyNewPassword: string;
};

const EditProfile = () => {
    const [error, setError] = useState<String | null>(null)
    const { userData, setUserData } = useUser()

    const defaultValues = {
        firstName: "",
        lastName: "",
        skills: "",
        bio: "",
    };

    const passwordDefaultValues = {
        currentPassword: "",
        newPassword: "",
        verifyNewPassword: "",
    };

    const {
        register: passwordRegister,
        handleSubmit: passwordhandleSubmit,
        formState: { errors: passwordErrors },
        watch
    } = useForm<PasswordFormFields>({ defaultValues: passwordDefaultValues });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<EditFormFields>({ defaultValues });

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

    const onPasswordSubmit = (formData: any) => {
    }

    return (
        <FormContainer>
            <Heading variant="h5">Edit Bio and Skills</Heading>
            <ProfileCard>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                            <Inputfield
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
                            <Inputfield
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
                            <Inputfield
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
                            <Inputfield
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
                        fullWidth
                    >
                        Edit Details
                    </StyledButton>
                </form>
                {error && <Box sx={{ color: "red", textAlign: "center" }}>{error}</Box>}
            </ProfileCard>
            <Heading variant="h5">Change Password</Heading>
            <ProfileCard >
                <form onSubmit={passwordhandleSubmit(onPasswordSubmit)}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                            <Inputfield
                                label="Old Password"
                                type="text"
                                fullWidth
                                margin="normal"
                                {...passwordRegister("currentPassword", { required: "Old Password is required" })}
                                error={!!passwordErrors.currentPassword}
                                helperText={passwordErrors.currentPassword?.message}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid2>

                        <Grid2 size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                            <Inputfield
                                label="New Password"
                                type="text"
                                fullWidth
                                margin="normal"
                                {...passwordRegister("newPassword", {
                                    required: "New Password is required",
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                        message:
                                            "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
                                    }
                                })}
                                error={!!passwordErrors.newPassword}
                                helperText={passwordErrors.newPassword?.message}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid2>

                        <Grid2 size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                            <Inputfield
                                label="Verify New Password"
                                type="text"
                                fullWidth
                                margin="normal"
                                rows={4}
                                {...passwordRegister("verifyNewPassword", {
                                    required: "Verify New Password is required",
                                    validate: (value) => value === watch("newPassword") || "Password is not matched",
                                })}
                                error={!!passwordErrors.verifyNewPassword}
                                helperText={passwordErrors.verifyNewPassword?.message}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid2>
                    </Grid2>
                    <StyledButton
                        type="submit"
                        variant="contained"
                        fullWidth
                    >
                        Change Password
                    </StyledButton>
                </form>
            </ProfileCard>
        </FormContainer>
    );
};

export default EditProfile;
