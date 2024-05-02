import {Box} from "@mui/material";

export default function LoadingContainer() {
    const boxStyles = {
        height: '90vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    return (
        <Box sx={boxStyles}>
            <img
                src='https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmtzYnM2MzQ3ZGgycjZraml2N3dnZnh2c3ZnYzQ5azR5eWU3djR0MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lU7uzQnAR5e1L3yoxC/giphy.gif'
            />
        </Box>
    )
}