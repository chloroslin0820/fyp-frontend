import {Box, Container, Typography} from "@mui/material";
import LoginContainer from "./component/LoginContainer.tsx";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {FirebaseUserData} from "../../../data/user/FirebaseUserData.ts";
import {LoginUserContext} from "../../../context/LoginUserContext.ts";

export default function LoginPage() {
    const navigate = useNavigate();
    const loginUser = useContext<FirebaseUserData | null | undefined>(LoginUserContext);

    useEffect(() => {
        loginUser &&
        setTimeout(() => {
            navigate("/");
        }, 1000);
    }, [loginUser]);

    const handleFaviconClick = () => {
        navigate('/');
    };

    const wholePageContainerStyles = {
        p: 0,
        width: '100%',
        backgroundImage: 'url("https://img.freepik.com/premium-vector/vector-seamless-food-pattern-with-cartoon-strawberries-dots-isolated-white-background_653743-101.jpg?w=1800")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

    const topBarStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#22002240',
        mb: 4
    }

    const topBarImageBoxStyles = {
        width: 150,
        cursor: 'pointer'
    }

    const topBarTypoStyles = {
        fontFamily: 'Noto Sans JP, sans-serif',
        fontSize: '60px',
        color: 'orangered',
        textShadow: '2px 2px #000'
    }

    return(
        <Container
            className="login-container"
            maxWidth="xl"
            sx={wholePageContainerStyles}
        >
                <Box sx={topBarStyles}>
                    <Box component="img" src="https://i.ibb.co/YhZGn2x/apple-favicon.png" sx={topBarImageBoxStyles} onClick={handleFaviconClick} />
                    <Typography sx={topBarTypoStyles}>果物の屋</Typography>
                </Box>
                <LoginContainer />
        </Container>
    )
}