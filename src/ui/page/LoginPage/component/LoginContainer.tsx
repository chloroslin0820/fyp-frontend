import {Box, Button, Container, Divider, TextField, Typography} from '@mui/material';
import React, {ChangeEvent, useState} from "react";
import * as FirebaseAuthService from "../../../../authService/FirebaseAuthService.ts";
import {useNavigate} from "react-router-dom";
import { Alert } from '@mui/material';
import {GoogleLoginButton} from "react-social-login-buttons";

const LoginContainer = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoginFailed, setIsLoginFailed] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleLogin = async () => {
        const loginResult = await FirebaseAuthService.handleSignInWithEmailAndPassword(email, password);
        loginResult
            ? navigate(-1)
            : setIsLoginFailed(true)
    }

    const handleGoogleSignIn = async () => {
        await FirebaseAuthService.handleSignInWithGoogle()
            && navigate(-1)
    }

    const loginContainerStyles = {
        width: '400px',
        height: '600px'
    }

    const loginBoxStyles = {
        textAlign: 'center',
        backgroundColor: '#FDAA0066',
        p: 2,
        m: '0'
    }

    const loginHeaderTypoStyles = {
        color: 'lightyellow',
        textShadow: '2px 2px #000'
    }

    const enterButtonStyles = {
        mt: 2,
        backgroundColor: '#AAAA00',
        color: 'lightyellow',
        textShadow: '2px 2px #000'
    }

    const loginDividerStyles = {
        height: 10,
        my: 3
    }

    const googleLoginButtonStyles = {
        width: '100%',
        margin: 0
    }

    return (
        <Container sx={loginContainerStyles}>
            <Box>
                {
                    isLoginFailed &&
                    <Alert severity="error" sx={{ mb: 1 }}>ログインできません。入力内容を確認してください。</Alert>
                }
                <Box sx={loginBoxStyles}>
                    <Typography variant="h4" component="h1" sx={loginHeaderTypoStyles}>
                        ログイン
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="メール"
                            name="email"
                            type="email"
                            autoComplete="email"
                            onChange={handleEmailChange}
                        />
                        <TextField
                            required
                            fullWidth
                            id="password"
                            label="パスワード"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            sx={{ mt: 2 }}
                            onChange={handlePasswordChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={enterButtonStyles}
                            onClick={handleLogin}
                        >
                            確認
                        </Button>
                    </Box>
                    <Divider sx={loginDividerStyles}/>
                    <Box>
                        <GoogleLoginButton
                            style={googleLoginButtonStyles}
                            onClick={handleGoogleSignIn}
                        >Googleでログイン</GoogleLoginButton>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginContainer;