import {ProductDetailDto} from "../productDetail/ProductDetailDto.ts";

export type TransactionDto = {
    tid:       number;
    buyer_uid: number;
    date_time: string;
    status:    string;
    total:     number;
    items:     TransactionProductDto[];
}

export type TransactionProductDto = {
    tpid:     number;
    product:  ProductDetailDto;
    quantity: number;
    subtotal: number;
}
