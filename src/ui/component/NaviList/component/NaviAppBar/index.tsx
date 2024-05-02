import {AppBar, Badge, Box, Button, InputBase, Toolbar, Typography} from "@mui/material";
import {ChangeEvent, useContext, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FirebaseUserData} from "../../../../../data/user/FirebaseUserData.ts";
import {LoginUserContext} from "../../../../../context/LoginUserContext.ts";
import {LoginYesButton} from "./component/LoginYesButton.tsx";
import {LoginNoButton} from "./component/LoginNoButton.tsx";

type Props = {
    itemsCount?: number
    hasSearchBar: boolean
    dispatchSearchText: (dispatchSearchText: string) => void
}

export let isPageBackNavList: boolean = true;
export let restoredText: string = "";

export const NaviAppBar = ({ itemsCount, hasSearchBar, dispatchSearchText }: Props) => {
    const navigate = useNavigate();
    const loginUser = useContext<FirebaseUserData | null | undefined>(LoginUserContext);
    const [searchText, setSearchText] = useState("待機中...");
    const timeoutRef = useRef<number | null>(null);
    let username = "";

    const handleShoppingCartClick = () => {
        isPageBackNavList = false;
        navigate("/shoppingcart");
    };

    useEffect(() => {
        dispatchSearchText(searchText);

        timeoutRef.current = window.setTimeout(() => {
            setSearchText("");
            dispatchSearchText(" ");
        }, 2000);

        return () => {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newText = event.target.value;

        if (newText.length > searchText.length) {
            const additionalText = newText.slice(searchText.length);
            const updatedText = searchText + additionalText;
            setSearchText(updatedText);
            restoredText = updatedText;
            dispatchSearchText(updatedText);
        } else {
            setSearchText(newText);
            restoredText = newText;
            dispatchSearchText(newText);
        }

        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
            restoredText = "";
        }, 2000);
    };

    const takeUsernameFromEmail = () => {
        const email = loginUser?.email;
        const parts = email?.split('@');
        if(parts !== undefined){
            const formattedUsername = parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();
            username = formattedUsername.charAt(0).toUpperCase() + formattedUsername.slice(1);
        }
    }

    const renderLoginUser = () => {
        if(loginUser){
            takeUsernameFromEmail();
            return <LoginYesButton username={username} />;
        } else if(loginUser === null) {
            return <LoginNoButton />;
        } else {
            return ("")
        }
    }

    const appBarStyles = {
        borderRadius: '8px',
        backgroundColor: 'orange',
        marginTop: '16px'
    }

    const shopNameTypoStyles = {
        boxShadow: 'none',
        color: 'darkred',
        flexGrow: 1,
        display: { xs: 'none', sm: 'block'}
    }

    const searchBarContainerStyles = {
        width: '450px',
        backgroundColor: '#DE770688',
        borderRadius: '16px', pl: '6px',
        boxShadow: '2px 2px orangered'
    }

    const searchBarInputBaseStyles = {
        color: 'darkred',
        width: '100%',
        padding: '8px',
        textAlign: 'right'
    }

    const shoppingCartPicStyles = {
        width: '20px',
        height: '20px',
        backgroundImage: 'url("https://i.ibb.co/Stgp9MW/shopping-cart.png")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        margin: '0'
    }

    const badgeStyles = {
        fontSize: '1px',
        ml: 1
    }

    const shoppingCartTypoContainerStyles = {
        display: 'block',
        color: '#CF6923',
        justifyContent: 'left',
        marginLeft: '8px'
    }

    return (
        <>
            <AppBar position="static" style={appBarStyles} >
                <Toolbar>
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={shopNameTypoStyles}
                    >
                        果物の屋
                    </Typography>
                    <Box>
                        {
                            hasSearchBar &&
                            <Box sx={searchBarContainerStyles}>
                                <InputBase
                                    placeholder="商品名．キーワードから探す"
                                    inputProps={{ 'aria-label': 'search' }}
                                    value={searchText}
                                    onChange={handleInputChange}
                                    sx={searchBarInputBaseStyles}
                                />
                            </Box>
                        }
                    </Box>
                    {
                        renderLoginUser()
                    }
                    <Box>
                        <Button onClick={handleShoppingCartClick} sx={{ marginLeft: '4px' }} >
                            <div style={shoppingCartPicStyles}>
                            </div>
                            <Badge badgeContent={itemsCount} color="error" sx={badgeStyles} />
                            <div style={shoppingCartTypoContainerStyles}>
                                <h3>カート</h3>
                            </div>
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}
