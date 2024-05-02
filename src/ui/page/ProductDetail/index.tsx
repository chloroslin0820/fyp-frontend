import {Container} from "@mui/material";
import {useEffect, useState} from "react";
import {ProductDetailDto} from "../../../data/productDetail/ProductDetailDto.ts";
import ProductDetailContainer from "./component/ProductDetailContainer.tsx";
import LoadingContainer from "../../component/LoadingContainer.tsx";
import * as ProductApi from "../../../api/ProductApi.ts";
import {useNavigate, useParams} from "react-router-dom";
import { HeaderEnum } from "../../component/HeaderEnum.ts";
import {ItemsCountHeaderContainer} from "../../component/ItemsCountHeaderContainer.tsx";

type Params = {
    productId: string
}
export let hasDto = false;
export let hasSearchBar = true;

export default function ProductDetail () {
    const [dto, setDto] = useState<ProductDetailDto | undefined>(undefined)
    const {productId} = useParams<Params>();
    const navigate =useNavigate();
    const currentHeader: HeaderEnum = HeaderEnum.Navibar;

    const fetchProductDetailDto = async (productId: string) => {
        try{
            const responseDto = await ProductApi.getProductById(productId)
            setDto(responseDto)
            if(dto){
                hasDto = true
            }else{
                hasDto = false
            }
        } catch (e) {
            navigate("/error")
        }
    }

    useEffect(() => {
        hasSearchBar = false;

        productId
            ? fetchProductDetailDto(productId)
            : navigate("/");
    }, []);

    return (
        <>
            <Container maxWidth="xl" sx={{ p: 0, backgroundImage: 'url("https://wallpapers.com/images/high/hawaiian-background-u4msxz3xiuln4a0d.webp")' }}>
                <ItemsCountHeaderContainer headerEnum={currentHeader} hasSearchBar={hasSearchBar}/>
                {
                    dto
                        ? <ProductDetailContainer dto={dto}/>
                        : <LoadingContainer />
                }
            </Container>
        </>
    )
}