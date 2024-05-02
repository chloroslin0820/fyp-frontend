import {Box} from "@mui/material";

export default function ErrorPage() {
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
                src='https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGQzd3RqYzZ5OTF0ODI3Y20zN2E1aWoybGJzMXlwODExNzRkODM0bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/S3thLnRWEpRwq6iDIO/giphy.gif'
            />
        </Box>
    )
}