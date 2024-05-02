import { FilledCartContainer } from "./FilledCartContainer.tsx";
import { BlankCartContainer } from "./BlankCartContainer.tsx";
import {useEffect, useState} from "react";
import * as CartItemApi from "../../../../api/CartItemApi.ts";

export let isCartBlank = true;

export const CartContainer = () => {
    const [cartItemLength, setCartItemLength]
        = useState<number | undefined>(undefined)

    const fetchDtoList = async () => {
        const response = await CartItemApi.getUserCart();
        const dtoLength = Object.keys(response).length;
        if(dtoLength > 0){
            isCartBlank = false;
        }
        setCartItemLength(dtoLength);
    }

    useEffect(() => {
        fetchDtoList();
    }, []);

    return (
        <>
            {
                cartItemLength !== undefined
                    && cartItemLength >= 1
                        ? <FilledCartContainer />
                        : <BlankCartContainer />
            }
        </>
    );
};