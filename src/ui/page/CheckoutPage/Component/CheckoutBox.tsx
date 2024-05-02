import {Box, Button, Divider, Stack, Typography} from "@mui/material"
import * as TransactionApi from "../../../../api/TransactionApi.ts";
import {useNavigate} from "react-router-dom";

type Props = {
    total: number;
    tid: string;
}

export const CheckoutBox = ({ total, tid }: Props) => {
    const navigate = useNavigate();

    const handleCheckout = async () => {
        try{
            await TransactionApi.finishTransaction(tid);
            navigate("/thankyou");
        } catch (e) {
            navigate("/error");
        }
    }

    const stackStyles = {
        justifyContent: 'space-between',
        margin: '30px 40px 0 40px',
        pb: 4,
        px: 5
    }

    const amountContainerStyles = {
        backgroundColor: 'white',
        px: 4,
        py:1,
        borderRadius: '8px',
        border: '4px solid gold'
    }

    const amountDividerStyles = {
        backgroundColor: 'black',
        height: 2,
        width: 250
    }

    const checkoutButtonStyles = {
        border: '2px solid red',
        backgroundColor: 'orangered'
    }

    const checkoutTypoStyles = {
        p: 2,
        color: 'white',
        textShadow: '2px 2px darkgrey'
    }

    return (
        <Stack direction="row"  sx={stackStyles} >
            <Box sx={amountContainerStyles}>
                <Typography variant="h4">
                    合計金額
                </Typography>
                <Divider sx={amountDividerStyles}/>
                <Typography variant="h4">
                    {total.toLocaleString('ja-JP', {
                        style: 'currency',
                        currency: 'JPY',
                    })}
                </Typography>
            </Box>
            <Box>
                <Button onClick={handleCheckout} sx={checkoutButtonStyles}>
                    <Typography variant="h3" sx={checkoutTypoStyles}>
                        ご注文内容の確認
                    </Typography>
                </Button>
            </Box>
        </Stack>
    )
}