import Link from "next/link.js";
import {Token} from "../Table";
import TableContainer from "./TableContainer";

export default function TableSubmitter({ token }: { token: Token }) {
    return (
        <TableContainer color="bg-gray-700">
            <Link href={`/history/user/${token.submitter}`}>
                {token.submitter}
            </Link>
        </TableContainer>
    )
}
