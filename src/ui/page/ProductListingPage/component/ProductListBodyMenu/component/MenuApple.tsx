import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import {Box, Typography} from "@mui/material";
import Paper from "@mui/material/Paper";
import {useEffect, useState} from "react";

type Props = {
    paperStyles: React.CSSProperties;
    menuListStyles: React.CSSProperties;
    menuClassItemStyles: React.CSSProperties;
    menuListItemTypoStyles: React.CSSProperties;
    menuItemContainerStyles: React.CSSProperties;
    onMenuItemClick?: (itemName: string) => void;
    searchText?: string;
}

export const MenuApple = ({
                              paperStyles,
                              menuListStyles,
                              menuClassItemStyles,
                              menuListItemTypoStyles,
                              menuItemContainerStyles,
                              onMenuItemClick,
                              searchText}: Props) => {
    const [lastClickedItem, setLastClickedItem] = useState<string | null>(null);
    const handleMenuItemClick = (itemName: string) => {
        if (onMenuItemClick) {
            onMenuItemClick(itemName);
            setLastClickedItem(itemName);
        }
    };

    useEffect(() => {
        console.log('searchText', searchText)
        let timeout: NodeJS.Timeout | undefined;

        if (lastClickedItem) {
            timeout = setTimeout(() => {
                if (onMenuItemClick) {
                    onMenuItemClick("");
                    setLastClickedItem(null);
                }
            }, 10000);
        }

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };

    }, [lastClickedItem]);

    return (
        <>
            <Paper sx={paperStyles}>
                <MenuList sx={menuListStyles}>
                    <MenuItem sx={menuClassItemStyles}>
                        <ListItemText>
                            <Typography sx={menuListItemTypoStyles}>
                                りんご類
                            </Typography>
                        </ListItemText>
                    </MenuItem>
                    <Box sx={menuItemContainerStyles}>
                        {[
                            "サンふじ",
                            "名月",
                            "トキ",
                            "秋映",
                            "シナノスイート",
                            "シナノゴールド",
                            "ピンクレディー",
                            "りんご詰合せ"
                        ].map((itemName) => (
                            <MenuItem key={itemName} onClick={() => handleMenuItemClick(itemName)}>
                                <ListItemText>{itemName}</ListItemText>
                            </MenuItem>
                        ))}
                    </Box>
                </MenuList>
            </Paper>
        </>
    )
}