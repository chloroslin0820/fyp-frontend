import {ProductImageSlider} from "./ProductImageSlider.tsx";


export const ProductImageSliderContainer = () => {
    const slides: { url: string; title: string; targetUrl?: string; }[] = [
        { url: "https://anshindo.itembox.design/item/images/banner/top/240409mioshizuku3000600.webp?t=20240410123550", title: "strawberry", targetUrl: "https://anshindo-d.com/c/shop_category/shop_fruits/shop_fruits_ichigo/1355"},
        { url: "https://anshindo.itembox.design/item/images/banner/top/220429tosakonatsu3000600.webp?t=20240410123550", title: "citron", targetUrl: "https://anshindo-d.com/c/shop_category/shop_fruits/shop_fruits_kankitu/407"},
        { url: "https://anshindo.itembox.design/item/images/banner/top/220414peachpine3000600.webp?t=20240410123550", title: "pineapple", targetUrl: "https://anshindo-d.com/c/shop_category/shop_fruits/shop_fruits_pineapple/414"},
        { url: "https://anshindo.itembox.design/item/images/banner/top/220426kawachibankan3000600.webp?t=20240417172329", title: "mandarin_yellow", targetUrl: "https://anshindo-d.com/c/shop_category/shop_fruits/shop_fruits_kankitu/shop_ooyanoyuki/572"},
        { url: "https://anshindo.itembox.design/item/images/banner/top/220521tadanouen3000600.webp?t=20240417172329", title: "cherry", targetUrl: "https://anshindo-d.com/c/shop_category/shop_fruits/shop_fruits_sakuranbo/419"},
    ];

    const containerStyles = {
        width: '1210px',
        height: '280px',
        margin: '0 auto'
    };

    return (
        <div>
            <div style={ containerStyles }>
                <ProductImageSlider slides={slides}/>
            </div>
        </div>
    )

}