import {Token} from "../Table";
import TableContainer from "./TableContainer";

export default function TableType({ token }: { token: Token }) {
    return (
        <TableContainer color={(token.type ? "bg-green-700" : "bg-orange-700")}>
            {token.type ? "Bot" : "User"}
        </TableContainer>
    )
}
