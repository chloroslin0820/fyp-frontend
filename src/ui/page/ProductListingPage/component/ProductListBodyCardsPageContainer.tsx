import {Box, Button, CircularProgress, Grid, Typography} from "@mui/material";
import ProductionListBodyCard from "./ProductionListBodyCard.tsx";
import { ProductDto } from "../../../../data/product/ProductDto.ts";
import { useEffect, useState } from "react";
import * as ProductApi from "../../../../api/ProductApi.ts";
import {restoredText} from "../../../component/NaviList/component/NaviAppBar";
import getFruitPids from "../component/ProductListBodyMenu/component/FruitPids.tsx";

type Props = {
    dtoList: ProductDto[];
    searchText?: string;
    menuItem?: string;
};

export const ProductListBodyCardsPageContainer = ({
                                                      dtoList,
                                                      searchText,
                                                      menuItem}: Props) => {
    const [updatedDtoList, setUpdatedDtoList] = useState<ProductDto[] | undefined>(dtoList);
    const cardsPerPage = 15;
    const [currentPage, setCurrentPage] = useState(1);
    const [updatedItemCount, setUpdatedItemCount] = useState<number | undefined>(undefined);
    const totalPages = Math.ceil((updatedDtoList?.length ?? 0) / cardsPerPage);
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    let paginatedData = updatedDtoList?.slice(startIndex, endIndex) ?? [];
    const [sortOrder, setSortOrder] = useState<"default" | "pid" | "asc_price" | "desc_price" | "random">("default");

    const fetchDtoList = async () => {
        const response = await ProductApi.getAllProducts();
        console.log(response)
        setUpdatedDtoList(response);
        paginatedData = response?.slice(startIndex, endIndex) ?? [];
        console.log(paginatedData)
        setUpdatedItemCount(Object.keys(response).length)
        applySort(sortOrder, response);
    };

    useEffect(() => {
        if(restoredText !== ""){
            restoredMode()
        } else if (menuItem !== "") {
            matchMenuItem()
        } else {
            nonRestoredMode()
        }

    }, [dtoList, menuItem]);

    const matchMenuItem = () => {
        console.log('menuItem', menuItem)
        const fruitPids = getFruitPids(menuItem);
        const filteredList = dtoList.filter((dto) =>
            fruitPids.includes(dto.pid.toString())
        );
        setUpdatedDtoList(filteredList);
        setUpdatedItemCount(filteredList.length);
        setCurrentPage(1);
    };

    const restoredMode = () => {
        const filteredList = dtoList.filter(
            (dto) =>
                dto.pid.toString().includes(restoredText.toLowerCase()) ||
                dto.name.toLowerCase().includes(restoredText.toLowerCase()) ||
                dto.description.toLowerCase().includes(restoredText.toLowerCase())
        );
        setUpdatedDtoList(filteredList);
        setUpdatedItemCount(filteredList.length);
        setCurrentPage(1);
    };

    const nonRestoredMode = () => {
        if (searchText === undefined || !searchText || searchText.trim() == "") {
            console.log('Container', searchText)
            fetchDtoList(); // Fetch all products
            console.log(paginatedData)
        } else if (updatedItemCount !== undefined) {
            const filteredList = dtoList.filter(
                (dto) =>
                    dto.pid.toString().includes(searchText.toLowerCase()) ||
                    dto.name.toLowerCase().includes(searchText.toLowerCase()) ||
                    dto.description.toLowerCase().includes(searchText.toLowerCase())
            );
            setUpdatedDtoList(filteredList);
            setUpdatedItemCount(filteredList.length);
            setCurrentPage(1);
        }
    };

    useEffect(() => {
        handleSortChange("random")
    }, []);

    const applySort = (order: "default" | "pid" | "asc_price" | "desc_price" | "random", list?: ProductDto[]) => {
        let sortedList = list ?? updatedDtoList;

        if (sortedList) {
            switch (order) {
                case "pid":
                    sortedList = [...sortedList].sort((a, b) => a.pid - b.pid);
                    break;
                case "asc_price":
                    sortedList = [...sortedList].sort((a, b) => a.price - b.price);
                    break;
                case "desc_price":
                    sortedList = [...sortedList].sort((a, b) => b.price - a.price);
                    break;
                case "random":
                    sortedList = shuffle([...sortedList]); // Shuffle the list for randomness
                    break;
                default:
                    break;
            }
            setUpdatedDtoList(sortedList);
        }
    };

    const handleSortChange = (order: "pid" | "asc_price" | "desc_price" | "random") => {
        setSortOrder(order);
        applySort(order);
    };

    const shuffle = (list: ProductDto[]): ProductDto[] => {
        for (let i = list.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [list[i], list[j]] = [list[j], list[i]];
        }
        return list;
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const gridContainerStyles = {
        display: "flex",
        gap: "16px", // Consistent gap between cards
        minHeight: "500px", // Ensure consistent height
    };

    const clickedPageButtonStyles = {
        minWidth: "1px",
        backgroundColor: "transparent",
        border: "2px solid orange",
        color: "orange",
        "&:hover": {
            backgroundColor: "lightyellow",
        },
    };

    const pageButtonStyles = {
        minWidth: "1px",
        backgroundColor: "#f1af08",
        border: "2px solid orange",
        color: "white",
        "&:hover": {
            backgroundColor: "#F1AF08",
            border: "2px solid beige",
            color: "beige",
            textShadow: "1px 1px orangered",
        }
    };

    const productListBodyRightPartContainerStyles = {
        width: '70vw'
    }

    const rightTopHeaderStyles = {
        height: '40px',
        marginBottom: '24px'
    }

    const rightTopHeaderTypoStyles = {
        display: 'flex',
        alignItems: 'center',
        color: 'orangered',
        textShadow: '1px 1px #000'
    }

    const rightTopHeaderButtonTypoStyles = {
        color: 'orange',
        border: 'orange 1px solid',
        borderRadius: '4px',
        backgroundColor: 'lightyellow',
    }

    const paginationButtons = [];
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === currentPage || i === totalPages) {
            paginationButtons.push(
                <Button
                    key={i}
                    variant={currentPage === i ? "contained" : "outlined"}
                    sx={i === currentPage ? clickedPageButtonStyles : pageButtonStyles}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </Button>
            );
        } else if (i === currentPage - 1 || i === currentPage + 1) {
            paginationButtons.push(
                <Button
                    key={i}
                    variant="outlined"
                    sx={pageButtonStyles}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </Button>
            );
        } else if (i === 2 || i === totalPages - 1) {
            paginationButtons.push(
                <Button key={i} variant="outlined" disabled sx={{ minWidth: "1px" }}>
                    ...
                </Button>
            );
        }
    }

    const BodyTop = () => {
        return (
            <Box sx={productListBodyRightPartContainerStyles}>
                <Box sx={rightTopHeaderStyles}>
                    <Box sx={rightTopHeaderTypoStyles}>
                        <Typography sx={{ fontSize: '16px' }}>商品数：</Typography>
                        {
                            updatedItemCount
                                ? <Typography sx={{ fontSize: '40px' }}>{updatedItemCount}</Typography>
                                : <Typography sx={{ fontSize: '40px' }}>---</Typography>
                        }
                        <Typography sx={{ fontSize: '16px' }}>件</Typography>
                    </Box>
                    <Box sx={rightTopHeaderTypoStyles}>
                        <Typography sx={{ fontSize: '16px' }}>並び替え：</Typography>
                        <Button
                            onClick={() => handleSortChange("pid")}
                        >
                            <Typography sx={rightTopHeaderButtonTypoStyles}>番号順</Typography>
                        </Button>
                        <Button
                            onClick={() => handleSortChange("asc_price")}
                        >
                            <Typography sx={rightTopHeaderButtonTypoStyles}>価格が安い順</Typography>
                        </Button>
                        <Button
                            onClick={() => handleSortChange("desc_price")}
                        >
                            <Typography sx={rightTopHeaderButtonTypoStyles}>価格が高い順</Typography>
                        </Button>
                        <Button
                            onClick={() => handleSortChange("random")}
                        >
                            <Typography sx={rightTopHeaderButtonTypoStyles}>ランダム</Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>
        )
    }

    return (
        <Box ml={4}>
            <Box sx={{ m: "0 0 0 0", p: 0 }}>
                <Box sx={{ mb: 4 }}>
                    {
                        updatedItemCount
                            ? <BodyTop />
                            : <CircularProgress sx={{
                            color: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
                            opacity: 0 }} />
                    }
                </Box>
                <Box>
                    <Box>
                        <Grid container spacing={4} style={gridContainerStyles}
                              alignItems="flex-start"
                        >
                            {paginatedData.map((dto) => (
                                <Grid
                                    item
                                    key={dto.pid}
                                >
                                    <ProductionListBodyCard dto={dto} />
                                </Grid>
                            ))}
                        </Grid>
                        <Box
                            sx={{
                                boxSizing: "border-box",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "right",
                            }}
                        >
                            <Box sx={{ margin: "10px 24px 0 0" }}>
                                {
                                    updatedItemCount
                                        ?
                                        <Typography variant="h6">
                                            {`${updatedItemCount} 件中 ${startIndex + 1} - ${endIndex} 件表示`}
                                        </Typography>
                                        :
                                        <CircularProgress sx={{
                                            color: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
                                            opacity: 0
                                        }} />
                                }
                            </Box>
                            <Box sx={{ marginTop: "20px" }}>
                                {paginationButtons}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
