import {Box, CircularProgress, Container} from "@mui/material";
import {HeaderEnum} from "../../../component/HeaderEnum.ts";
import {ItemsCountHeaderContainer} from "../../../component/ItemsCountHeaderContainer.tsx";
import {PageBackLoadingContainer} from "./PageBackLoadingContainer.tsx";
import {CartContainer} from "./CartContainer.tsx";
import {isPageBackNavList} from "../../../component/NaviList/component/NaviAppBar";

export default function PageContainer() {
    const currentHeader: HeaderEnum = HeaderEnum.CartHeader;

    const isPageBack = (): boolean => {
        return isPageBackNavList;
    }

    return(
        <>
            <Container maxWidth="xl" sx={{
                height: '100vh',
                mx: 0,
                p: 2
            }}
            >
                <Box sx={{ height: '100%' }}>
                    {
                        currentHeader
                            ? <ItemsCountHeaderContainer headerEnum={currentHeader} />
                            : <CircularProgress sx={{
                                color: "rgba(0, 0, 0, 0.5)",
                                opacity: 0
                            }} />
                    }
                    {
                        isPageBack()
                            ? <PageBackLoadingContainer />
                            : <CartContainer />
                    }
                </Box>
            </Container>
        </>
    )
}