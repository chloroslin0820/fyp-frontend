import {Box, CircularProgress} from "@mui/material";
import {useEffect, useState} from "react";
import PageContainer from "./component/PageContainer.tsx";
import {GlobalStyle} from "./component/Global.style.tsx";
import * as CartItemApi from "../../../api/CartItemApi.ts";
import {isPageBackNavList} from "../../component/NaviList/component/NaviAppBar";
import {ShoppingCartStepper} from "./component/ShoppingCartStepper.tsx";

export default function ShoppingCart() {
    const [dtoListLength, setDtoListLength] = useState<number | undefined>(undefined);
    const fetchDtoList = async () => {
        const response = await CartItemApi.getUserCart();
        if(response){
            setDtoListLength(Object.keys(response).length)
        }
    }

    useEffect(() => {
        fetchDtoList()
    }, [dtoListLength]);

    return (
        <>
            <GlobalStyle/>
            {
                !isPageBackNavList && dtoListLength && dtoListLength > 0
                    ? <Box sx={{position: "absolute", right: 0, padding: 7}}>
                        <ShoppingCartStepper /></Box>
                    : <CircularProgress sx={{
                        color: "rgba(0, 0, 0, 0.5)",
                        opacity: 0
                    }} />
            }
            <PageContainer />
        </>
    );
}
