import {AppBar, Container, Toolbar, Typography} from "@mui/material";
import {CheckoutTable} from "./CheckoutTable.tsx";
import {TransactionDto} from "../../../../data/transaction/TransactionDto.ts";

type Props = {
    dto: TransactionDto;
}

export const CheckoutContainer = ({ dto }: Props) => {

    const checkoutContainerStyles = {
        p: 0,
        width: '100%'
    }

    const checkoutAppBarStyles = {
        position: 'static',
        borderRadius: '8px',
        backgroundColor: 'orange',
        marginTop: '16px'
    }

    return (
        <>
            <Container
                className="login-container"
                maxWidth="xl"
                sx={checkoutContainerStyles}
            >
                <AppBar sx={checkoutAppBarStyles}>
                    <Toolbar>
                        <Typography variant="h5" color="darkred">
                            レジに進む
                        </Typography>
                    </Toolbar>
                </AppBar>
                <CheckoutTable dto={dto}/>
            </Container>
        </>
    )
}