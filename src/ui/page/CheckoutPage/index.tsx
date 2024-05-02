import {Box} from "@mui/material";
import {CheckoutContainer} from "./Component/CheckoutContainer.tsx";
import {CartHead} from "../ShoppingCart/component/CartHead.tsx";
import {useContext, useEffect, useState} from "react";
import {CheckoutBox} from "./Component/CheckoutBox.tsx";
import {TransactionDto} from "../../../data/transaction/TransactionDto.ts";
import LoadingContainer from "../../component/LoadingContainer.tsx";
import * as TransactionApi from "../../../api/TransactionApi.ts";
import {useNavigate, useParams} from "react-router-dom";
import {LoginUserContext} from "../../../context/LoginUserContext.ts";
import {FirebaseUserData} from "../../../data/user/FirebaseUserData.ts";
import {ShoppingCartStepper} from "../ShoppingCart/component/ShoppingCartStepper.tsx";

type Params = {
    transactionId: string;
}

export const CheckoutPage = () => {
    const params = useParams<Params>();
    const [dto, setDto] = useState<TransactionDto | undefined>(undefined);
    const loginUser = useContext<FirebaseUserData | undefined | null>(LoginUserContext)
    const [clickStep, setClickStep] = useState(0);
    const navigate = useNavigate();

    const handleStepper = () => {
        setClickStep((prev) => prev + 2);
    };

    const fetchTransactionDto = async (tid: string) => {
        try{
            const response = await TransactionApi.getTransaction(tid);
            setDto(response);
        } catch (e) {
            navigate("/error")
        }
    }

    useEffect(() => {
        if(params.transactionId && loginUser){
            fetchTransactionDto(params.transactionId)
        }
        if(clickStep === 0){
            handleStepper();
        }
    }, [loginUser]);

    const shoppingCartStepperContainerStyles = {
        position: "absolute",
        right: 0,
        padding: 7
    }

    const wholePageBoxStyles = {
        backgroundImage: 'url("https://img.freepik.com/premium-vector/abstract-background-lemons-slices-lines-spots-citrus-pattern-your-text_655857-16.jpg?w=740")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%'
    }

    return (
        <>
            <Box sx={shoppingCartStepperContainerStyles}>
                <ShoppingCartStepper stepTarget={clickStep} />
            </Box>
            <Box
                sx={wholePageBoxStyles}
            >
                <Box>
                    <CartHead />
                </Box>
                <Box>
                    <Box paddingX="20px">
                        {
                            dto && params.transactionId
                                ?<>
                                    <CheckoutContainer dto={dto}/>
                                    <CheckoutBox total={dto?.total} tid={params.transactionId}/>
                                </>
                                : <LoadingContainer />
                        }
                    </Box>
                </Box>
            </Box>
        </>
    )
}