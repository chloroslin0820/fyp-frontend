import {Backdrop, Box, Button, CircularProgress, Typography} from "@mui/material";
import {useState} from "react";
import * as TransactionApi from "../../../../api/TransactionApi.ts";
import {useNavigate} from "react-router-dom";

export const CartPayButton = () => {
    const [isBackDropOpen, setIsBackDropOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const handlePlay = async () => {
        setIsBackDropOpen(true)
        const response = await TransactionApi.prepareTransaction();
        navigate(`/checkout/${response.tid}`);
    }

    const cartPayButtonContainerStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const cartPayButtonStyles = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red",
        width: "30vw",
        transition: "all 0.3s", // Smooth transition
        "&:hover": {
            backgroundColor: "yellow", // Background color on hover
            color: "white", // Text color on hover
            textShadow: "2px 2px orangered", // Text shadow on hover
            border: "2px solid orangered", // Border on hover
        }
    }

    return (
        <>
            <Box sx={cartPayButtonContainerStyles}>
                <Button
                    sx={cartPayButtonStyles}
                    onClick={handlePlay}
                >
                    <Typography variant='h5' sx={{color: 'white'}}>
                        ご注文手続きに進む
                    </Typography>
                </Button>
            </Box>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={isBackDropOpen}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        </>
    );
}