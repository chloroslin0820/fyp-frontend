import axios from "axios";
import {ProductDto} from "../data/product/ProductDto.ts";
import {ProductDetailDto} from "../data/productDetail/ProductDetailDto.ts";
import getEnvConfig from "../config/EnvConfig.ts";

const baseUrl = getEnvConfig().baseUrl;
export async function getAllProducts() {
    try{
        const response = await axios.get<ProductDto[]>(`${baseUrl}/public/product`);
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export async function getProductById(pid: string) {
    try{
        const response = await axios.get<ProductDetailDto>(`${baseUrl}/public/product/${pid}`);
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}