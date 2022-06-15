import Link from "next/link.js";
import {Token} from "../Table";
import TableContainer from "./TableContainer";

export default function TableLink({ token }: { token: Token }) {
    return (
        <TableContainer color="bg-gray-700">
            {token.link?.startsWith("http") ? (
                <Link href={token.link}>
                    {(new URL(token.link)).hostname}
                </Link>
            ) : "N/A"}
        </TableContainer>
    )
}
