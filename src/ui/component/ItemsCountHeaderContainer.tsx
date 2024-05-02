import {useContext, useEffect, useState} from "react";
import * as CartItemApi from "../../api/CartItemApi.ts";
import {CartHead} from "../page/ShoppingCart/component/CartHead.tsx";
import { HeaderEnum } from "./HeaderEnum.ts";
import {CartItemDto} from "../../data/cartItem/CartItemDto.ts";
import {FirebaseUserData} from "../../data/user/FirebaseUserData.ts";
import {LoginUserContext} from "../../context/LoginUserContext.ts";
import {NaviList} from "./NaviList";

type Props = {
    headerEnum: HeaderEnum.Navibar | HeaderEnum.CartHeader;
    dispatchAction?: (dispatchedCartItemDto: CartItemDto) => void;
    hasSearchBar?: boolean;
    dispatchSearchText?: (dispatchSearchText: string) => void;
    onTabClick?: (index: number) => void;
}

export const ItemsCountHeaderContainer = ({
                                              headerEnum,
                                              dispatchAction,
                                              hasSearchBar,
                                              dispatchSearchText,
                                              onTabClick}: Props) => {
    const [itemsCount, setItemsCount]
        = useState<number>(0);
    const [cartDtoList, setCartDtoList]
        = useState<CartItemDto[] | undefined>(undefined);
    const loginUser
        = useContext<FirebaseUserData | undefined | null>(LoginUserContext);

    const getItemsCount = async () => {
        const responseCartDtoList = await CartItemApi.getUserCart()
        setItemsCount (
            Object.keys(responseCartDtoList).length
        )
        setCartDtoList(
            responseCartDtoList
        )
        if (cartDtoList) {
            cartDtoList.forEach((item: CartItemDto, index: number) => {
                if(item && index && dispatchAction){
                    dispatchAction(item)
                }
            });
        }
    }

    useEffect(() => {
        if(loginUser) {
            getItemsCount();
        }
    }, [loginUser, itemsCount]);

    return (
        <>
            {
                headerEnum === HeaderEnum.Navibar && onTabClick
                    ? <NaviList
                        itemsCount={itemsCount}
                        hasSearchBar={hasSearchBar}
                        dispatchSearchText={dispatchSearchText}
                        onTabClick={onTabClick}/>
                    : <CartHead />
            }
        </>
    )
}