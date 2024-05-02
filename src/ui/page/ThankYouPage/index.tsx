import {Box, Typography} from "@mui/material";
import {CartHead} from "../ShoppingCart/component/CartHead.tsx";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FirebaseUserData} from "../../../data/user/FirebaseUserData.ts";
import {LoginUserContext} from "../../../context/LoginUserContext.ts";
import {ShoppingCartStepper} from "../ShoppingCart/component/ShoppingCartStepper.tsx";

export const ThankYouPage = () => {
    const [clickStep, setClickStep] = useState(0);
    const loginUser = useContext<FirebaseUserData | undefined | null>(LoginUserContext)
    const navigate = useNavigate();
    const [second, setSecond] = useState<number>(5)
    const handleStepper = () => {
        setClickStep((prev) => prev + 3);
    };

    const handleCountDown = () => {
        setSecond((prev) =>
            prev - 1
        );
    }

    useEffect(() => {
        if(second <= 0 ){
            navigate("/");
        }
        if(clickStep === 0){
            handleStepper();
        }
        const countDown = setTimeout(handleCountDown, 1000)
        return (() => {
            clearTimeout(countDown);
        })
    }, [loginUser, second]);

    return (
        <>
            <Box sx={{position: "absolute", right: 0, padding: 7}}>
                <ShoppingCartStepper stepTarget={clickStep} />
            </Box>
            <Box
                sx={{
                    backgroundImage: 'url("https://img.freepik.com/premium-vector/abstract-background-lemons-slices-lines-spots-citrus-pattern-your-text_655857-16.jpg?w=740")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh'}}
            >
                <Box>
                    <CartHead />
                </Box>
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '20px' }}>
                        <Typography variant="h5">{second}秒後にホームページに戻ります</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img
                            src="https://image-cdn.tabechoku.com/crop/w/1440/h/1081/cw/1440/ch/1080/images/fa68e4a8358713a691c1f3fc14f578288a9ddc1d44285465b3e5e3a3161e5018.jpg"
                            height="400px"
                        />
                    </Box>
                </Box>
            </Box>
        </>
    )
}