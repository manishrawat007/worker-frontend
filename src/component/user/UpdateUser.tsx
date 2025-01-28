import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getProfile } from "@/service/apiUrls";
import Loader from "../../custom/loader/Loader";
import useFetch from "@/custom/api/Fetch";

const FormContainer = styled(Box)({
    maxWidth: "500px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
});

const StyledButton = styled(Button)({
    marginTop: "15px",
    backgroundColor: "#007bff",
    "&:hover": {
        backgroundColor: "#0056b3",
    },
});

const UserUpdate = () => {
    const {data:user,loading}=useFetch({request:getProfile})

    const defaultValues = {
        firstName: "John",
        lastName: "Doe",
        age: 28,
        gender: "male",
        skills: "JavaScript, React, Node.js",
        bio: "I am a passionate developer with a love for learning new technologies.",
    };

    const { control,
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({ defaultValues });

    useEffect(() => {
        if (user) {
          reset({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            age: user.age || "",
            gender: user.gender || "male",
            skills: user.skills || "",
            bio: user.bio || "",
          });
        }
      }, [user, reset])

    if (loading) {
        return <Loader />
    }

    const onSubmit = (data: any) => {
        console.log("Form Data Submitted:", data);
    };

    return (
        <FormContainer>
            <Typography variant="h5" textAlign="center" marginBottom={2}>
                Update Your Details
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="First Name"
                    fullWidth
                    margin="normal"
                    {...register("firstName", { required: "First name is required" })}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                />

                <TextField
                    label="Last Name"
                    fullWidth
                    margin="normal"
                    {...register("lastName", { required: "Last name is required" })}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                />

                <TextField
                    label="Age"
                    type="number"
                    fullWidth
                    margin="normal"
                    {...register("age", { required: "Age is required" })}
                    error={!!errors.age}
                    helperText={errors.age?.message}
                />

                <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            select
                            label="Gender"
                            fullWidth
                            margin="normal"
                            {...field}
                            error={!!errors.gender}
                            helperText={errors.gender?.message}
                        >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                        </TextField>
                    )}
                />

                <TextField
                    label="Skills"
                    fullWidth
                    margin="normal"
                    {...register("skills", { required: "Skills are required" })}
                    error={!!errors.skills}
                    helperText={errors.skills?.message}
                />

                <TextField
                    label="Bio"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    {...register("bio", { required: "Bio is required" })}
                    error={!!errors.bio}
                    helperText={errors.bio?.message}
                />

                <StyledButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Update Details
                </StyledButton>
            </form>
        </FormContainer>
    );
};

export default UserUpdate;
