import {
    Avatar,
    Box, CircularProgress, Dialog, DialogContent, DialogContentText,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField,
    Typography,
} from "@mui/material";
import {Delete as DeleteIcon} from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import {CartItemDto} from "../../../../data/cartItem/CartItemDto.ts";
import {ChangeEvent, FC, useContext, useEffect, useState} from "react";
import * as CartItemApi from "../../../../api/CartItemApi.ts";
import {FirebaseUserData} from "../../../../data/user/FirebaseUserData.ts";
import {LoginUserContext} from "../../../../context/LoginUserContext.ts";
import LoadingContainer from "../../../component/LoadingContainer.tsx";

type CartTableContainerProps  = {
    dispatchAction?: (dispatchedIsCartReady: boolean) => void;
    dispatchQuantityAction?: (dispatchQuantity: Quantities) => void;
    dispatchPriceAction?: (dispatchPrice: Prices) => void;
    isPriceAllDel: boolean;
    isQuanAllDel: boolean;
}

export type Quantities = {
    [key: number]: number;
}

export type Prices = {
    [key: number]: number;
}

const debounce = (func: () => void, wait: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);
    };
};

export const CartTableContainer: FC<CartTableContainerProps> = ({
                                                                    dispatchAction,
                                                                    dispatchQuantityAction,
                                                                    dispatchPriceAction,
                                                                    isPriceAllDel,
                                                                    isQuanAllDel }) => {
    const [cartDtoList, setCartDtoList]
        = useState<CartItemDto[] | undefined>(undefined);
    const [quantities, setQuantities]
        = useState<Quantities>({});
    const [quantityPatchingItemId, setQuantityPatchingItemId]
        = useState<number | null>(null);
    const [deletingItemId, setDeletingItemId]
        = useState<number | null>(null);
    const [openDialog, setOpenDialog]
        = useState(false);
    const loginUser
        = useContext<FirebaseUserData | undefined | null>(LoginUserContext);

    useEffect(() => {
        if(loginUser) {
            const getItems = async () => {
                const response = await CartItemApi.getUserCart();

                setCartDtoList(response);
                const initialQuantities = response.reduce((acc: Quantities, item: CartItemDto) => {
                    acc[item.pid] = item.cart_quantity || 0;
                    return acc;
                }, {});
                setQuantities(initialQuantities);
                const initialPrice = response.reduce((acc: Prices, item: CartItemDto) => {
                    acc[item.pid] = item.price || 0;
                    return acc;
                }, {});
                if (dispatchPriceAction) {
                    dispatchPriceAction(initialPrice);
                }
                if (dispatchQuantityAction) {
                    dispatchQuantityAction(initialQuantities);
                }
                if (dispatchAction) {
                    dispatchAction(true);
                }
            };
            getItems();

            if (openDialog) {
                const timer = setTimeout(() => {
                    setOpenDialog(false);
                }, 1000);

                return () => clearTimeout(timer);
            }
        }
    }, [loginUser, openDialog]);

    const handleInputChange = async (pid: number, e: ChangeEvent<HTMLInputElement>, stock: number) => {
        const input = e.target.value;
        const parsedValue = parseFloat(input);

        if (!isNaN(parsedValue) && parsedValue > 0 && parsedValue <= stock) {
            const updateCart = debounce(async () => {
                setQuantityPatchingItemId(pid);

                const response = await CartItemApi.updateUserCartItemQuantity(pid, parsedValue);
                setQuantities((prevQuantities) => {
                    const newQuantities = {
                        ...prevQuantities,
                        [pid]: parsedValue,
                    };

                    if (dispatchQuantityAction) {
                        dispatchQuantityAction(newQuantities);
                    }
                    return newQuantities;
                });

                if(cartDtoList !== undefined) {
                    const updatedDtoList = cartDtoList.map ((item)=>{
                        item.cart_quantity = response.cart_quantity;
                        return item;
                    })
                    setCartDtoList(updatedDtoList);
                }

                setQuantityPatchingItemId(null);
            }, 1000);


            updateCart();
        }
    };

    const handleDelete = async (pid: number) => {
        setDeletingItemId(pid);

        try {
            await CartItemApi.removeUserCartItem(pid);
            const updatedDtoList = cartDtoList?.filter((item) => item.pid !== pid);
            setCartDtoList(updatedDtoList);

            if (updatedDtoList) {
                setQuantities((prevQuantities) => {
                    const newQuantities = { ...prevQuantities };
                    delete newQuantities[pid];
                    return newQuantities;
                });
            }
        } catch (error) {
            console.error("Error deleting item:", error);
        } finally {
            setDeletingItemId(null);
        }
    };

    const handleDeleteIconClick = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
            {
                !isPriceAllDel && !isQuanAllDel ?
                    <TableContainer component={Paper} sx={{ p: 2, boxSizing: 'border-box' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>商品名</TableCell>
                                    <TableCell>数量</TableCell>
                                    <TableCell>小計</TableCell>
                                    <TableCell>削除</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartDtoList && cartDtoList.map((item) => (
                                    <TableRow sx={{ height: '140px' }} key={item.pid}>
                                        <TableCell>
                                            <Box sx={{ display: 'flex' }}>
                                                <Box sx={{ mr: 2 }}>
                                                    <Avatar src={`${item.img_url}`} sx={{ width: 120, height: 'auto', borderRadius: 0 }} />
                                                </Box>
                                                <Box sx={{ display: 'block' }}>
                                                    <Typography variant='h6'>
                                                        {item.name}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: '2rem', color: '#F00' }}>
                                                        {item.price.toLocaleString('ja-JP',
                                                            {style: 'currency', currency: 'JPY'})}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100px' }}>
                                                {
                                                    quantityPatchingItemId === item.pid
                                                        ? <CircularProgress/>
                                                        : <TextField
                                                            sx={{ width: '100%' }}
                                                            type="number"
                                                            value={quantities[item.pid]} // Use the unique PID to get the corresponding quantity
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(item.pid, e, item.stock)} />

                                                }
                                            </Box>
                                        </TableCell>
                                        <TableCell>{(quantities[item.pid] * item.price).toLocaleString('ja-JP', {
                                            style: 'currency',
                                            currency: 'JPY',
                                        })}</TableCell>
                                        <TableCell>
                                            {
                                                deletingItemId === item.pid
                                                    ? <CircularProgress />
                                                    :  <IconButton aria-label="delete" onClick={() => handleDelete(item.pid)}>
                                                        <DeleteIcon onClick={handleDeleteIconClick} />
                                                    </IconButton>
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    : <LoadingContainer />
            }
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogContent sx={{ backgroundColor: '#DDEE88BB', border: '1px solid orangered' }}>
                    {
                        cartDtoList !== undefined && Object.keys(cartDtoList).length
                            ? <DialogContentText variant="h6" sx={{ color: 'white', textShadow: 'orangered 2px 2px' }}>
                                この商品を削除しました</DialogContentText>
                            : <DialogContentText variant="h6" sx={{ color: 'white', textShadow: 'orangered 2px 2px' }}>
                                全ての商品を削除しました</DialogContentText>
                    }

                </DialogContent>
            </Dialog>
        </>
    );
};