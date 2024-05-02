import {Box, CircularProgress, Divider, Typography} from "@mui/material";
import {CartTableContainer} from "./CartTableContainer.tsx";
import {CartPayButton} from "./CartPayButton.tsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

type Quantities = { [key: string]: number };
type Prices = { [key: string]: number };

export const FilledCartContainer = () => {
    const [isCartReady, setIsCartReady]
        = useState<boolean>(false);
    const [quantity, setQuantity]
        = useState<Quantities | undefined>(undefined);
    const [price, setPrice]
        = useState<Prices | undefined>(undefined);
    const [totalPrice, setTotalPrice]
        = useState<number>(0);
    const [itemCount, setItemCount]
        = useState<number>(0);
    const [isQuanAllDel, setIsQuanAllDel]
        = useState<boolean>(false);
    const [isPriceAllDel, setIsPriceAllDel]
        = useState<boolean>(false);
    const navigate
        = useNavigate();

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | undefined;

        if (isQuanAllDel && isPriceAllDel) {
            timeoutId = setTimeout(() => {
                navigate('/');
            }, 3000);
        }
        return () => clearTimeout(timeoutId);
    }, [isQuanAllDel, isPriceAllDel, navigate]);

    const handleChildDispatch = (isTableReady: boolean) => {
        setIsCartReady(isTableReady);
    };

    const handleQuantityDispatch = (dispatchQuantity: Quantities) => {
        dispatchQuantity &&
            setQuantity(dispatchQuantity)
        if(Object.keys(dispatchQuantity).length < 1){
            setIsQuanAllDel(true)
        }
    }

    const handlePriceDispatch = (dispatchPrice: Prices) => {
        dispatchPrice &&
        setPrice(dispatchPrice)
        if(Object.keys(dispatchPrice).length < 1){
            setIsPriceAllDel(true)
        }
    }

    useEffect(() => {
        if (quantity && price) {
            let newTotal = 0;
            Object.keys(quantity).forEach((key: string) => {
                const itemQuantity = quantity[key];
                const itemPrice = price[key];
                if (itemQuantity !== undefined && itemPrice !== undefined) {
                    newTotal += itemQuantity * itemPrice;
                }
            });
            setTotalPrice(newTotal);
            setItemCount(Object.keys(quantity).length);
        }
    }, [quantity, price]);

    const contentContainerStyles = {
        display: 'block',
        margin: '44px 0 0 0',
        backgroundColor: 'transparent',
        padding: '10px',
        height: '100vh',
    };

    return (
        <>
            <Box sx={contentContainerStyles}>
                <Box sx={{ height: '60px', m: 0 }}>
                    <Typography variant="h4" sx={{ color: 'orange', textShadow: '2px 2px darkgrey' }}>
                        ショッピングカート
                    </Typography>
                </Box>
                <CartTableContainer
                    dispatchAction={handleChildDispatch}
                    dispatchQuantityAction={handleQuantityDispatch}
                    dispatchPriceAction={handlePriceDispatch}
                    isPriceAllDel={isPriceAllDel}
                    isQuanAllDel={isQuanAllDel} />
                {isCartReady && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', height: '200px', width: '100vw' }}>
                        <Box sx={{ p: 5, width: '30%' }}>
                            <Box sx={{ display: 'flex', pb: 2 }}>
                                <Typography variant='h4' color='error'>送料無料</Typography>
                                <Box sx={{ mt: 2, ml: 1 }}>
                                    <Typography>です。</Typography>
                                </Box>
                            </Box>
                            <Typography>上記割引はお届け先ごとに再計算されます。</Typography>
                        </Box>
                        <Box sx={{ width: '70%', display: 'flex' }}>
                            <Box sx={{ width: '20%' }}/>
                            <Box sx={{ width: '80%', mx: 8, my: 2, backgroundColor: 'transparent' }}>
                                {
                                    itemCount ?
                                    <Box boxSizing='border-box' sx={{ display: 'block', m: 0, p: 0 }}>
                                        <Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, mx: 6, p: '0 4px' }}>
                                                <Typography variant='h6'>数量</Typography>
                                                <Typography variant='h6'>{itemCount}</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mx: 6, p: '0 4px' }}>
                                                <Typography variant='h6'>商品合計（税込）</Typography>
                                                <Typography variant='h6'>
                                                    {totalPrice.toLocaleString("ja-JP", { style: "currency", currency: "JPY" })}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Divider sx={{ mb: 1 }} />
                                                <CartPayButton />
                                            </Box>
                                        </Box>
                                    </Box>
                                        :<CircularProgress sx={{
                                            color: "rgba(0, 0, 0, 0.5)",
                                            opacity: 0
                                        }} />
                                }
                            </Box>
                        </Box>
                    </Box>
                )}
            </Box>
        </>
    )
}