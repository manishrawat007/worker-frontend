import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Account, AccountContainer, Container, Forgot, ForgotContainer, ImageContainer, InnerComponent, Inputfield, LogoContainer, SignupButton, StyledButton, Title } from './Login.styled';
import { useRouter } from 'next/router';
import { loginapi } from '@/service/apiUrls';
import { toast } from 'react-toastify';
import { Grid2 } from '@mui/material';
import Image from 'next/image';
import { ThemeContext } from '@/styles/ThemeProvider';

export type FormData = {
    email: string;
    password: string;
};

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const {darkMode}= useContext(ThemeContext)

    // Handle form submission
    const onSubmit = (data: FormData) => {
        setLoading(true)
        loginapi(data).then((res) => {
            toast.success("Login Successfull")
            localStorage.setItem("token", res?.data?.token);
            router.push('/feeds')
        }).catch(() => {
            toast.error("Invalid Credentials")
        }).finally(() => {
            setLoading(false)
        })
    };

    return (
        <Grid2 container>
            <Grid2 size={{ xs: 12, sm: 12, md: 5, lg: 5 }}>
                <Container>
                    <InnerComponent component="form" onSubmit={handleSubmit(onSubmit)}>
                        <LogoContainer dark={darkMode}>
                            <Image
                                src="/images/login_logo.png"
                                alt="Logo"
                                height={100}
                                width={100} />
                        </LogoContainer>
                        <Title>Connect, Chat & Date</Title>
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
                        <ForgotContainer>
                            <Forgot>Forgot Password</Forgot>
                        </ForgotContainer>

                        <StyledButton type="submit"
                            variant="contained"
                            fullWidth
                            disabled={loading}>
                            Login
                        </StyledButton>
                    </InnerComponent>
                    <AccountContainer>
                        <Account onClick={() => router.push('/signup')}>Love is just a click away!<SignupButton> Sign in now.</SignupButton></Account>
                    </AccountContainer>
                </Container>
            </Grid2>
            <Grid2 size={{ xs: 0, sm: 0, md: 7, lg: 7 }} sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
                <ImageContainer />
            </Grid2>
        </Grid2>
    );
};

export default Login;
