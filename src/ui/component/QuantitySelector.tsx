import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    Stack,
    Typography
} from "@mui/material";
import * as CartItemApi from "../../api/CartItemApi.ts";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

type Props = {
    quantity: number;
    handleMinus: () => void;
    handlePlus: () => void;
    pid: number;
}

export let isAddToCartClicked = false;

export default function QuantitySelector({ quantity, handleMinus, handlePlus, pid }: Props) {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);

    const addItemsToCart = async () => {
        await CartItemApi.putCartItem(pid, quantity);
    }

    const handleCartButtonClick = () => {
        addItemsToCart();
        setOpenDialog(true);

        isAddToCartClicked = true;
    }

    useEffect(() => {
        if (openDialog) {
            const timer = setTimeout(() => {
                setOpenDialog(false);
                navigate('/');
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [openDialog, navigate]);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const stackStyles = {
        direction: 'row',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '15px',
        border: '2px solid yellow',
        borderRadius: 4,
        backgroundColor: 'lightyellow'
    }

    const buttonStyles = {
        display: 'flex'
    }

    const adjustNumContainerStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const buttonMinusPicStyles = {
        padding: 0,
        minWidth: '48px',
        height: '48px',
        backgroundImage: 'url("https://img.icons8.com/?size=80&id=21091&format=png")',
        backgroundSize: 'contain'
    }

    const buttonPlusPicStyles = {
        padding: 0,
        minWidth: '48px',
        height: '48px',
        backgroundImage: 'url("https://img.icons8.com/?size=80&id=21097&format=png")',
        backgroundSize: 'contain'
    }

    const shoppingCartButtonContainerStyles = {
        ml: 8,
        border: '2px solid orange',
        maxWidth: 170,
        height: 60,
        backgroundColor: 'orange'
    }

    const shoppingCartTypoStyles = {
        textShadow: '2px 2px red'
    }

    const dialogContentStyles = {
        backgroundColor: '#DDEE88BB',
        border: '1px solid orangered'
    }

    const dialogContentTextStyles = {
        color: 'white',
        textShadow: 'orangered 2px 2px'
    }

    return (
        <Stack sx={stackStyles}>
            <Box sx={{ display: 'flex' }}>
                <Box sx={buttonStyles}>
                    <Box sx={adjustNumContainerStyles}>
                        <Button style={buttonMinusPicStyles} onClick={handleMinus}></Button>
                        <Box sx={{ mx: 2 }}>
                            <Typography variant='h6'>{quantity}</Typography>
                        </Box>
                        <Button style={buttonPlusPicStyles} onClick={handlePlus}></Button>
                    </Box>
                    <Box>
                        <Button sx={shoppingCartButtonContainerStyles}>
                            <Typography
                                variant='h6'
                                color='white'
                                sx={shoppingCartTypoStyles}
                                onClick={handleCartButtonClick}
                            >カートに入れる</Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogContent sx={dialogContentStyles}>
                    <DialogContentText variant="h6" sx={dialogContentTextStyles}>
                        この商品をカートに入れました
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </Stack>
    )
}