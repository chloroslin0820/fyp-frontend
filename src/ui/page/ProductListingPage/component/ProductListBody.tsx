import {Box, CircularProgress} from "@mui/material";
import ProductListBodyMenu from "./ProductListBodyMenu";
import {useEffect, useState} from "react";
import {ProductDto} from "../../../../data/product/ProductDto.ts";
import * as ProductApi from "../../../../api/ProductApi.ts"
import {useNavigate} from "react-router-dom";
import {
    ProductListBodyCardsPageContainer
} from "./ProductListBodyCardsPageContainer.tsx";

type Props = {
    searchText?: string
    selectedTab?: number
}

export const ProductListBody = ({ searchText, selectedTab }: Props) => {
    const [getAllProductDtoList, setGetAllProductDtoList]
        = useState<ProductDto[] | undefined>(undefined);
    const navigate = useNavigate();
    const [updatedSearchText, setUpdatedSearchText] = useState<string | undefined>(undefined)
    const [menuItem, setMenuItem] = useState<string>("")

    const handleMenuItemClick = (menuItem: string) => {
        console.log(`Menu item clicked: ${menuItem}`);
        setMenuItem(menuItem);
    };

    const fetchAllProducts = async () => {
        try{
            const responseDtoList = await ProductApi.getAllProducts();
            setGetAllProductDtoList(responseDtoList);
        } catch (e) {
            navigate("/error");
        }
    }

    useEffect(() => {
        fetchAllProducts()
        setUpdatedSearchText(searchText)
        console.log('searchText', searchText)
    }, [searchText]);

    const productListBodyContainerStyles = {
        display: 'flex',
        margin: '0 auto'
    };

    const productListBodyMenuContainerStyles = {
        marginTop: '16px',
        width: '30%',
        left: '0'
    };

    return (
      <Box sx={productListBodyContainerStyles}>
          <Box sx={productListBodyMenuContainerStyles}>
              {
                  selectedTab ? <ProductListBodyMenu selectedTab={selectedTab} onMenuItemClick={handleMenuItemClick}/>
                      : <ProductListBodyMenu onMenuItemClick={handleMenuItemClick} searchText={searchText} />
              }
          </Box>
              {
                  getAllProductDtoList ?
                      <ProductListBodyCardsPageContainer
                          dtoList={getAllProductDtoList}
                          searchText={updatedSearchText}
                          menuItem={menuItem}/>
                      : <CircularProgress sx={{
                          color: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
                          opacity: 0
                      }} />
              }
      </Box>
    )
}