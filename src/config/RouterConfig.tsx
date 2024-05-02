import {createBrowserRouter} from "react-router-dom";
import {ProductListingPage} from "../ui/page/ProductListingPage";
import LoginPage from "../ui/page/LoginPage";
import ShoppingCart from "../ui/page/ShoppingCart";
import ErrorPage from "../ui/page/ErrorPage";
import ProductDetail from "../ui/page/ProductDetail";
import { CheckoutPage } from "../ui/page/CheckoutPage";
import { ThankYouPage } from "../ui/page/ThankYouPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ProductListingPage/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/product/:productId",
        element: <ProductDetail/>
    },
    {
        path: "/shoppingcart",
        element: <ShoppingCart/>
    },
    {
        path: "/login",
        element: <LoginPage/>
    },
    {
        path: "/checkout/:transactionId",
        element: <CheckoutPage/>
    },
    {
        path: "/thankyou",
        element: <ThankYouPage/>
    },
    {
        path: "/error",
        element: <ErrorPage/>
    }
])