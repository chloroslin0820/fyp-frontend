import {Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export const BlankCartContainer = () => {
    const navigate
        = useNavigate();
    const [isShow, setIsShow]
        = useState<boolean>(false)

    useEffect(() => {
        setTimeout(() => {
            setIsShow(true);
        }, 1000);
    }, []);

    const handleClick = () => {
        navigate("/");
    };

    const contentContainerStyles = {
        display: 'block',
        margin: "44px 0 0 0",
        backgroundColor: 'white',
        padding: '44px',
        height: '100vh'
    };

    const contentPicContainerStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const contentPicStyles = {
        height: '260px',
        width: '300px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: 'url("https://anshindo.itembox.design/item/images/parts/svg/ico_cart0.svg")'
    };

    const blankCartButton = () => {
        return (
            <>
                <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', backgroundColor: 'transparent', padding: 0 }}>
                    <Button onClick={handleClick} sx={{ marginLeft: '4px' }} >
                        <Typography sx={{ fontSize: '20px', fontWeight: 'bolder', color: 'orange', textShadow: '1px 1px orangered' }}>ショッピングを続ける ＞</Typography>
                    </Button>
                </Box>
            </>
        )
    }

    return (
        <>
            <Box>
                <Box sx={contentContainerStyles}>
                    {
                        isShow &&
                        <Box sx={{ position: 'relative', top: '100px' }}>
                            <Typography sx={{ fontSize: '24px', fontWeight: 'bolder', color: 'orangered', textShadow: '1px 1px #000' }}>ショッピングカートは空です</Typography>
                            <Box sx={contentPicContainerStyles}>
                                <Box sx={contentPicStyles}></Box>
                            </Box>
                        </Box>
                    }
                </Box>
                <Box sx={{ height: '50%' }}>
                    {blankCartButton()}
                </Box>
            </Box>
        </>
    )
}