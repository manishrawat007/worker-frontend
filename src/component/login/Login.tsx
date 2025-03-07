import React from 'react';
import { useForm } from 'react-hook-form';
import { Account, Container, InnerComponent, Inputfield, SignupButton, StyledButton, Title } from './Login.styled';
import { useRouter } from 'next/router';
import { loginapi } from '@/service/apiUrls';
import { toast } from 'react-toastify';

export type FormData = {
    email: string;
    password: string;
};

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const router = useRouter()

    // Handle form submission
    const onSubmit = (data: FormData) => {
        loginapi(data).then((res) => {
            toast.success("Login Successfull")
            localStorage.setItem("token", res?.data?.token);
            router.push('/feeds')
        }).catch(() => {
            toast.error("Invalid Credentials")
        })
    };

    return (
        <Container>
            <InnerComponent component="form" onSubmit={handleSubmit(onSubmit)}>
                <Title>Login</Title>
                <Inputfield
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

                <Inputfield
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

                <StyledButton type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth>
                    Login
                </StyledButton>

                <Account onClick={() => router.push('/signup')}>Do not have account? <SignupButton>SignUP</SignupButton></Account>
            </InnerComponent>
        </Container>
    );
};

export default Login;
