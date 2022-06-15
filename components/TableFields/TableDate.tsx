import {Token} from "../Table";
import TableContainer from "./TableContainer";

export default function TableDate({ token }: { token: Token }) {
    return (
        <TableContainer color="bg-gray-700">
            {new Date(token.createdAt).toJSON().slice(0, 10)}
        </TableContainer>
    )
}
