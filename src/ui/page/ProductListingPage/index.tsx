import {Container} from "@mui/material";
import {ProductImageSliderContainer} from "./component/ProductImageSliderContainer.tsx";
import {ProductListBody} from "./component/ProductListBody.tsx";
import {ItemsCountHeaderContainer} from "../../component/ItemsCountHeaderContainer.tsx";
import { HeaderEnum } from "../../component/HeaderEnum.ts";
import {useEffect, useState} from "react";

export let hasSearchBar = true;

type HandleInputChange = (dispatchSearchText: string) => void

export const ProductListingPage = () => {
    const currentHeader: HeaderEnum = HeaderEnum.Navibar;
    const [searchText, setSearchText] = useState<string>("");
    const [selectedTab, setSelectedTab] = useState<number | null>(null);

    useEffect(() => {
        hasSearchBar = true;
    }, []);

    const handleInputChange: HandleInputChange = (dispatchSearchText) => {
        if(dispatchSearchText){
            setSearchText(dispatchSearchText);
        }else{
            setSearchText(" ");
        }
    };

    const handleTabClick = (index: number) => {
        setSelectedTab(index); // Update the selected tab index
        console.log('index', index)
    };

    return (
      <Container maxWidth="xl"
                 sx={{
                     p: 0,
                     backgroundImage: 'url("https://wallpapers.com/images/high/hawaiian-background-u4msxz3xiuln4a0d.webp")' }}
      >
          <ItemsCountHeaderContainer
              headerEnum={currentHeader}
              hasSearchBar={hasSearchBar}
              dispatchSearchText={handleInputChange}
              onTabClick={handleTabClick}
          />
          <ProductImageSliderContainer />
          {
              searchText && selectedTab
                  && <ProductListBody searchText={searchText} selectedTab={selectedTab}/>
          }
      </Container>
    )
}