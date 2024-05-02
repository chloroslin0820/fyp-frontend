import React, {useContext, useState} from "react";
import {Box, Divider, Typography} from "@mui/material";
import QuantitySelector from "../../../component/QuantitySelector.tsx";
import {ProductDetailDto} from "../../../../data/productDetail/ProductDetailDto.ts";
import {FirebaseUserData} from "../../../../data/user/FirebaseUserData.ts";
import {LoginUserContext} from "../../../../context/LoginUserContext.ts";

type Props = {
    dto: ProductDetailDto
}

export default function ProductDetailContainer({ dto }: Props) {
    const [quantity, setQuantity]
        = useState<number>(1)
    const loginUser
        = useContext<FirebaseUserData | null | undefined>(LoginUserContext);

    const handleMinus = () => {
        quantity > 1 &&
        setQuantity((prevState) => (
            prevState - 1
        ))
    }

    const handlePlus = () => {
        quantity < dto.stock &&
        setQuantity((prevState) => (
            prevState + 1
        ))
    }

    const leftContainerStyles = {
        display: 'block',
        marginRight: '80px'
    }

    const leftContainerTypoBoxStyles = {
        display: 'flex',
        justifyContent: 'center',
        textIndent: '40px'
    }

    const productImgStyles: React.CSSProperties = {
        position: 'relative',
        marginTop: '30px',
        left: '40px',
        width: '42vw',
        border: '1px outset lightyellow',
    }

    const rightContainerStyles = {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '40px'
    }

    const pidTypoStyles = {
        fontSize: '12px',
        color: '#666'
    }

    const textBoxesContainerStyles = {
        display: 'flex',
        position: 'relative',
        padding: 0
    }

    const textBoxStyles = {
        padding: 0,
        minWidth: 51,
        margin: '0 10px 0 0'
    }

    const textBoxNumberThreeStyles = {
        padding: 0,
        minWidth: 75,
        margin: '0 10px 0 0'
    }

    const textBoxNumberOneTypoStyles = {
        color: 'white',
        border: 'lightyellow 1px solid',
        borderRadius: '3px',
        backgroundColor: 'violet',
        fontSize: '12px'
    }

    const textBoxNumberTwoTypoStyles = {
        color: 'white',
        border: 'lightyellow 1px solid',
        borderRadius: '3px',
        backgroundColor: 'seagreen',
        fontSize: '12px'
    }

    const textBoxNumberThreeTypoStyles = {
        color: 'white',
        border: 'lightyellow 1px solid',
        borderRadius: '3px',
        backgroundColor: 'gold',
        fontSize: '12px'
    }

    const soldOutTypoStyles = {
        color: 'white',
        border: 'lightyellow 1px solid',
        borderRadius: '3px',
        backgroundColor: 'darkgrey',
        fontSize: '12px'
    }

    const attentionBoxStyles = {
        marginTop: '4px',
        minWidth: '100px',
        padding: 0
    }

    const attentionTypoStyles = {
        color: 'red',
        border: 'red 2px solid',
        borderRadius: '3px',
        backgroundColor: 'white',
        fontSize: '16px'
    }

    const dividerNumberOneStyles = {
        height: 10,
        width: 0
    }

    const dividerNumberTwoStyles = {
        height: 5,
        width: 0
    }

    const dividerNumberThreeStyles = {
        height: 16,
        width: 0
    }

    const shopBoxStyles = {
        width: 400,
        height: 75
    }

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Box sx={leftContainerStyles}>
                    <Box>
                        <img style={productImgStyles} src={dto.imgUrl}/>
                    </Box>
                    <Box sx={leftContainerTypoBoxStyles}>
                        <Typography sx={{ fontSize: '16px' }}>クリックして拡大画像を表示</Typography>
                    </Box>
                </Box>
                <Box sx={rightContainerStyles}>
                    <Box sx={{ display: 'block' }}>
                        <Typography variant="h4" sx={{ marginBottom: '4px' }}>{dto.name}</Typography>
                        <Box sx={{ width: 500 }}>
                            <Typography sx={{ marginBottom: '-2px' }}>{dto.description}</Typography>
                        </Box>
                        <Typography variant="h5" sx={{ color: 'red' }}>¥ {dto.price}</Typography>
                        {
                            dto.pid < 10
                                ? <Typography sx={pidTypoStyles}>商品番号： 6080000{dto.pid}</Typography>
                                : dto.pid < 100
                                    ? <Typography sx={pidTypoStyles}>商品番号： 608000{dto.pid}</Typography>
                                    : <Typography sx={pidTypoStyles}>商品番号： 60800{dto.pid}</Typography>
                        }
                        <Typography sx={{ fontSize: '12px', color: '#666' }}>備考(送料)： 送料込</Typography>
                        <Divider sx={dividerNumberOneStyles} />
                        <Box sx={textBoxesContainerStyles}>
                            <Box sx={textBoxStyles}><Typography sx={textBoxNumberOneTypoStyles}>送料無料</Typography></Box>
                            <Box sx={textBoxStyles}><Typography sx={textBoxNumberTwoTypoStyles}>産地直送</Typography></Box>
                            <Box sx={textBoxNumberThreeStyles}><Typography sx={textBoxNumberThreeTypoStyles}>日時指定不可</Typography></Box>
                            {
                                dto.stock <= 0 &&
                                <Box sx={textBoxStyles}><Typography sx={soldOutTypoStyles}>売れ切り</Typography></Box>
                            }
                        </Box>
                        <Divider sx={dividerNumberTwoStyles} />
                        <Box>
                            <Box sx={attentionBoxStyles}>
                                <Typography sx={attentionTypoStyles}>【注意】ご発送まで1週間～2週間ほどお時間がかかります。</Typography>
                            </Box>
                        </Box>
                        <Divider sx={dividerNumberThreeStyles} />
                        {
                            dto.stock > 0 && loginUser &&
                            <Box sx={shopBoxStyles}>
                                <QuantitySelector quantity={quantity} handleMinus={handleMinus} handlePlus={handlePlus} pid={dto.pid}/>
                            </Box>
                        }
                    </Box>
                </Box>
            </Box>
        </>


    )
}