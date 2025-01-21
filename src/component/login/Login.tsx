import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';
import { Container, Title } from './Login.styled';
import { useRouter } from 'next/router';
import { loginapi } from '@/service/apiUrls';

export type FormData = {
    email: string;
    password: string;
};

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const router = useRouter()

    // Handle form submission
    const onSubmit = (data: FormData) => {
        loginapi(data).then(()=>{
            router.push('/home') 
        }).catch((err)=>{
            console.log('err------',err)
        })
    };

    return (
        <Container>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
                <Title>Login</Title>
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    {...register('email',
                        {
                            required: 'Email is required',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Please enter a valid email address',
                            },

                        })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    margin="normal"
                />

                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters long',
                        },
                        pattern: {
                            value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                            message: 'Password must contain at least one number, one uppercase letter, one special character, and be at least 8 characters long.',
                        },
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    margin="normal"
                />

                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>
            </Box>
        </Container>
    );
};

export default Login;
