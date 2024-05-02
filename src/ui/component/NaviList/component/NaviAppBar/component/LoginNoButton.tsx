import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const LoginNoButton = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    };

    const loginPicStyles = {
        width: '20px',
        height: '20px',
        backgroundImage: 'url("https://i.ibb.co/dQ6pS4v/user.png")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        margin: '0'
    }

    const loginTypoStyles = {
        display: 'block',
        color: '#CF6923',
        justifyContent: 'left',
        marginLeft: '8px'
    }

    return (
        <Button onClick={handleLoginClick}>
            <div style={loginPicStyles}></div>
            <div style={loginTypoStyles}>
                <h3>ログイン</h3></div>
        </Button>
    )
}