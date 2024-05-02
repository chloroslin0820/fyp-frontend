import { MenuApple } from "./component/MenuApple.tsx";
import {MenuCitron} from "./component/MenuCitron.tsx";
import {useEffect} from "react";
import {MenuStrawberry} from "./component/MenuStrawberry.tsx";
import {MenuPeach} from "./component/MenuPeach.tsx";
import {MenuGrape} from "./component/MenuGrape.tsx";
import {MenuPear} from "./component/MenuPear.tsx";
import {MenuMelon} from "./component/MenuMelon.tsx";
import {MenuWatermelon} from "./component/MenuWatermelon.tsx";
import {MenuMango} from "./component/MenuMango.tsx";
import {MenuOther} from "./component/MenuOther.tsx";
import LoadingContainer from "../../../../component/LoadingContainer.tsx";

type Props = {
    selectedTab?: number;
    onMenuItemClick?: (menuItem: string) => void;
    searchText?: string;
}

export default function ProductListBodyMenu({ selectedTab, onMenuItemClick, searchText }: Props) {

    useEffect(() => {
        console.log('selectedTab', selectedTab)
    }, [selectedTab]);

    const paperStyles: React.CSSProperties = {
        width: 300,
        maxWidth: '100%',
        borderRadius: '8px',
        border: '2px lightyellow solid',
        backgroundColor:
            selectedTab === 1 ? '#FFA502CC' :
                selectedTab === 2 ? 'rgba(192,57,57,0.89)' :
                    selectedTab === 3 ? 'rgba(234,2,57,0.84)':
                        selectedTab === 4 ? 'rgba(255,127,157,0.79)' :
                            selectedTab === 5 ? 'rgba(91,4,245,0.7)' :
                                selectedTab === 6 ? 'rgba(197,236,57,0.79)' :
                                    selectedTab === 7 ? 'rgba(243,125,6,0.75)' :
                                        selectedTab === 8 ? 'rgba(57,236,93,0.92)' :
                                            selectedTab === 9 ? 'rgba(236,194,57,0.92)' :
                                                selectedTab === 10 ? 'rgba(7,5,5,0.22)' :
                                                    '#FFA502CC'
    };

    const menuListStyles: React.CSSProperties = {
        padding: 0,
        borderRadius: '16px'
    };

    const menuClassItemStyles: React.CSSProperties = {
        height: '80px',
        padding: 0
    };

    const menuListItemTypoStyles: React.CSSProperties = {
        fontSize: '36px',
        color: '#FFF',
        textShadow: '1px 1px orangered'
    };

    const menuItemContainerStyles: React.CSSProperties = {
        backgroundColor: '#FFF'
    };

    return (
        <>

            {
                selectedTab === 1
                    ?
                    <MenuCitron
                        paperStyles={paperStyles}
                        menuListStyles={menuListStyles}
                        menuClassItemStyles={menuClassItemStyles}
                        menuListItemTypoStyles={menuListItemTypoStyles}
                        menuItemContainerStyles={menuItemContainerStyles}
                        onMenuItemClick={onMenuItemClick}
                        searchText={searchText}/>
                        : selectedTab === 2
                        ? <MenuApple
                            paperStyles={paperStyles}
                            menuListStyles={menuListStyles}
                            menuClassItemStyles={menuClassItemStyles}
                            menuListItemTypoStyles={menuListItemTypoStyles}
                            menuItemContainerStyles={menuItemContainerStyles}
                            onMenuItemClick={onMenuItemClick}/>
                        : selectedTab === 3
                            ? <MenuStrawberry
                                paperStyles={paperStyles}
                                menuListStyles={menuListStyles}
                                menuClassItemStyles={menuClassItemStyles}
                                menuListItemTypoStyles={menuListItemTypoStyles}
                                menuItemContainerStyles={menuItemContainerStyles}
                                onMenuItemClick={onMenuItemClick}/>
                            : selectedTab === 4
                                ?<MenuPeach
                                    paperStyles={paperStyles}
                                    menuListStyles={menuListStyles}
                                    menuClassItemStyles={menuClassItemStyles}
                                    menuListItemTypoStyles={menuListItemTypoStyles}
                                    menuItemContainerStyles={menuItemContainerStyles}
                                    onMenuItemClick={onMenuItemClick}/>
                                : selectedTab === 5
                                    ?<MenuGrape
                                        paperStyles={paperStyles}
                                        menuListStyles={menuListStyles}
                                        menuClassItemStyles={menuClassItemStyles}
                                        menuListItemTypoStyles={menuListItemTypoStyles}
                                        menuItemContainerStyles={menuItemContainerStyles}
                                        onMenuItemClick={onMenuItemClick}/>
                                    : selectedTab === 6
                                        ?<MenuPear
                                            paperStyles={paperStyles}
                                            menuListStyles={menuListStyles}
                                            menuClassItemStyles={menuClassItemStyles}
                                            menuListItemTypoStyles={menuListItemTypoStyles}
                                            menuItemContainerStyles={menuItemContainerStyles}
                                            onMenuItemClick={onMenuItemClick}/>
                                        : selectedTab === 7
                                            ?<MenuMelon
                                                paperStyles={paperStyles}
                                                menuListStyles={menuListStyles}
                                                menuClassItemStyles={menuClassItemStyles}
                                                menuListItemTypoStyles={menuListItemTypoStyles}
                                                menuItemContainerStyles={menuItemContainerStyles}
                                                onMenuItemClick={onMenuItemClick}/>
                                            : selectedTab === 8
                                                ?<MenuWatermelon
                                                    paperStyles={paperStyles}
                                                    menuListStyles={menuListStyles}
                                                    menuClassItemStyles={menuClassItemStyles}
                                                    menuListItemTypoStyles={menuListItemTypoStyles}
                                                    menuItemContainerStyles={menuItemContainerStyles}
                                                    onMenuItemClick={onMenuItemClick}/>
                                                : selectedTab === 9
                                                    ?<MenuMango
                                                        paperStyles={paperStyles}
                                                        menuListStyles={menuListStyles}
                                                        menuClassItemStyles={menuClassItemStyles}
                                                        menuListItemTypoStyles={menuListItemTypoStyles}
                                                        menuItemContainerStyles={menuItemContainerStyles}
                                                        onMenuItemClick={onMenuItemClick}/>
                                                    : selectedTab === 10
                                                        ?<MenuOther
                                                            paperStyles={paperStyles}
                                                            menuListStyles={menuListStyles}
                                                            menuClassItemStyles={menuClassItemStyles}
                                                            menuListItemTypoStyles={menuListItemTypoStyles}
                                                            menuItemContainerStyles={menuItemContainerStyles}
                                                            onMenuItemClick={onMenuItemClick}/>
                                                        : <LoadingContainer/>
            }
        </>
    );
}