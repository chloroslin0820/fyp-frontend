import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {TabsBar} from "./component/TabsBar.tsx";
import {NaviAppBar} from "./component/NaviAppBar";

type Props = {
    itemsCount: number
    hasSearchBar?: boolean
    dispatchSearchText?: (dispatchSearchText: string) => void;
    onTabClick?: (index: number) => void;
}

export const NaviList = ({
                             itemsCount,
                             hasSearchBar,
                             dispatchSearchText,
                             onTabClick
                             }: Props) => {
    const navigate = useNavigate();

    const internalFaviconClickHandler = () => {
        navigate("/");
    };

    const naviAppBarContainerStyles = {
        m: 0,
        p: 0,
        display: 'flex'
    }

    const tabsBarContainerStyles = {
        width: '100%',
        marginTop: 1,
        border: 'yellow 2px solid',
        borderRadius: 4,
        backgroundColor: 'lightyellow'
    }

    return (
        <Box sx={naviAppBarContainerStyles}>
            <Box sx={{ width: '17%', cursor: 'pointer' }}
                 onClick={internalFaviconClickHandler}>
                <Box
                    component="img"
                    src="https://i.ibb.co/YhZGn2x/apple-favicon.png"
                    sx={{ width: 150 }}
                />
            </Box>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ flexGrow: 1 }}>
                    {
                        hasSearchBar !== undefined && dispatchSearchText &&
                        <NaviAppBar
                            itemsCount={itemsCount}
                            hasSearchBar={hasSearchBar}
                            dispatchSearchText={dispatchSearchText}
                        />
                    }
                </Box>
                <Box sx={tabsBarContainerStyles}>
                    {
                        onTabClick && <TabsBar onTabClick={onTabClick}/>
                    }
                </Box>
            </Box>
        </Box>
    );
}