import {Box, Button, Menu} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import React, {useState} from "react";
import * as FirebaseAuthService from "../../../../../../authService/FirebaseAuthService.ts";

type Props = {
    username: string;
}

export const LoginYesButton = ({ username }: Props) => {
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    const handleLogout = () => {
        FirebaseAuthService.handleSignOut();
        handleMenuClose();
    };

    const loginButtonStyles = {
        backgroundColor: 'transparent',
        border: 'none',
        boxShadow: 'none',
        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)'}
    }

    const loginPicStyles = {
        width: '20px',
        height: '20px',
        backgroundImage: 'url("https://i.ibb.co/dQ6pS4v/user.png")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        margin: '0'
    }

    const loginTypoContainerStyles = {
        display: 'block',
        color: '#CF6923',
        justifyContent: 'left',
        marginLeft: '8px'
    }

    const menuContainerStyles = {
        style: {
            backgroundColor: '#FFA502',
            borderRadius: '2px',
            color: '#CF6923',
            boxShadow: '2px 2px yellow'
        }
    }

    const menuItemStyles = {
        backgroundColor: '#FFA502',
        borderRadius: '2px',
        color: '#CF6923',
        width: '120px'
    }

    return (
        <Box>
            <Button
                onClick={handleMenuOpen}
                variant="contained"
                sx={loginButtonStyles}
            >
                <div style={loginPicStyles}></div>
                <div style={loginTypoContainerStyles}>
                    <h3 style={{textTransform: 'none'}}>{username}</h3></div>
            </Button>
            <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
                PaperProps={menuContainerStyles}
            >
                <MenuItem
                    onClick={handleLogout}
                    style={menuItemStyles}
                >
                    ログアウト
                </MenuItem>
            </Menu>
        </Box>
    )
}