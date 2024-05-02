import {Box, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const CartHead = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };

    const hasStepperStyles  = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#22002240',
        height: '20%'
    }

    return (
        <>
            <Box sx={hasStepperStyles}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Box component="img" src="https://i.ibb.co/YhZGn2x/apple-favicon.png" sx={{ width: 150, cursor: 'pointer' }} onClick={handleClick}/>
                    <Typography sx={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '60px', color: 'orangered', textShadow: '2px 2px #000' }}>果物の屋</Typography>
                </Box>
            </Box>
        </>
    )
}