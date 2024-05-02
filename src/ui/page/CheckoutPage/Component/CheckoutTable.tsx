import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@mui/material';
import {CheckoutTableRow} from "./CheckoutTableRow.tsx";
import {TransactionDto} from "../../../../data/transaction/TransactionDto.ts";

type Props = {
    dto: TransactionDto;
}

export const CheckoutTable = ({ dto }: Props) => {

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>商品名</TableCell>
                        <TableCell>単価</TableCell>
                        <TableCell>数量</TableCell>
                        <TableCell>小計</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        dto.items.map((item) => (
                            <CheckoutTableRow dto={item}/>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};
