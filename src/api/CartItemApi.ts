import * as FirebaseAuthService from "../authService/FirebaseAuthService.ts";
import axios from "axios";
import {CartItemDto} from "../data/cartItem/CartItemDto.ts";
import getEnvConfig from "../config/EnvConfig.ts";

const baseUrl = getEnvConfig().baseUrl;

const getAuthConfig = async () => {
    const accessToken = await FirebaseAuthService.getAccessToken()

    if(!accessToken) {
        throw new Error("Access token is not available");
    }

    return {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    };
}

export async function putCartItem(pid: number, quantity: number) {
    try {
        await axios.put(
            `${baseUrl}/cart/${pid}/${quantity}`,
            null,
            await getAuthConfig()
        )
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export async function getUserCart(): Promise<CartItemDto[]> {
    try {
        const response
            = await axios.get(
                `${baseUrl}/cart`,
                await getAuthConfig())
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export async function updateUserCartItemQuantity(pid: number, quantity: number) {
    try {
        const response
            = await axios.patch(
            `${baseUrl}/cart/${pid}/${quantity}`,
            null,
            await getAuthConfig())
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export async function removeUserCartItem(pid: number) {
    try {
        await axios.delete(
            `${baseUrl}/cart/${pid}`,
            await getAuthConfig()
        )
    } catch (e) {
        console.error(e);
        throw e;
    }
}