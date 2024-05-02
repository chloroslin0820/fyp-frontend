import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Box, Button, CardActionArea} from '@mui/material';
import {ProductDto} from "../../../../data/product/ProductDto.ts";
import {useNavigate} from "react-router-dom";

type Props = {
    dto: ProductDto
}

export default function ProductionListBodyCard({dto}: Props) {
    const navigate = useNavigate();

    const cardContainerStyles = {
        marginTop: '60px',
    };

    const cardActionAreaStyles = {
        maxWidth: 240,
        width: 240,
        margin: '0 0'
    };

    const soldOutButtonTypoStyles = {
        color: 'red',
        border: 'red 1px solid',
        borderRadius: '3px',
        backgroundColor: 'pink',
        fontSize: '11px'
    }

    const showSoldOut = (): React.JSX.Element | null => {
        if (!dto.has_stock) {
            return (
                <Button>
                    <Typography sx={soldOutButtonTypoStyles}>売れ切り</Typography>
                </Button>
            );
        } else {
            return null;
        }
    }

    return (
        <Card sx={cardContainerStyles}>
            <CardActionArea
                sx={cardActionAreaStyles}
                onClick={() =>{navigate(`/product/${dto.pid}`)}}>
                <CardMedia
                    component="img"
                    height="320"
                    image={dto.img_url}
                />
                <CardContent>
                    <Box sx={{ display: 'flex', height: '60%' }}>
                        <Typography gutterBottom sx={{ fontSize: '16px' }} component="div" height="4rem">
                            {dto.name}
                            <Typography sx={{ fontSize: '12px' }} color="text.secondary">
                                {dto.description}
                            </Typography>
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', height: '20%' }}>
                        <Typography sx={{ fontSize: '20px', color: 'green' }}>
                            {dto.price.toLocaleString('ja-JP',
                                {style: 'currency', currency: 'JPY'})} 〜
                        </Typography>
                        {
                            showSoldOut()
                        }
                    </Box>
                    <Box sx={{ height: '60px 20%', border: '1px solid red', color: 'red' }}>
                        <Typography sx={{ fontSize: '12px'}}>
                            【注意】発送は5月上旬から6月下旬です。発送期間中は3～7日ほどで発送いたします。
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}