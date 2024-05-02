import {TableCell, TableRow} from "@mui/material";
import {TransactionProductDto} from "../../../../data/transaction/TransactionDto.ts";

type Props = {
    dto: TransactionProductDto
}

export const CheckoutTableRow = ({ dto }: Props) => {
    return (
        <TableRow key={0}>
            <TableCell>
                <img
                    src={dto.product.imgUrl}
                    height="150px"
                />
            </TableCell>
            <TableCell>{dto.product.name}</TableCell>
            <TableCell>{dto.product.price.toLocaleString(
                'ja-JP', {
                    style: 'currency',
                    currency: 'JPY',})}
            </TableCell>
            <TableCell>{dto.quantity}</TableCell>
            <TableCell>{dto.subtotal.toLocaleString(
                'ja-JP', {
                    style: 'currency',
                    currency: 'JPY',})}
            </TableCell>
        </TableRow>
    )
}