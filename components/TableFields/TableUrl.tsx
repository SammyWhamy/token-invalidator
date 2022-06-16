import {Token} from "../Table";
import TableContainer from "./TableContainer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link"
export default function TableToken({ token }: { token: Token }) {
    return (
        <TableContainer color="bg-gray-200">
            <div className="flex-initial flex items-center group relative cursor-pointer">
              <Link href = {`/history/id/${token.id}`}><FontAwesomeIcon icon={faArrowUpRightFromSquare} /></Link>
              <div className="absolute text-sm hidden group-hover:block animate-slide left-10 bg-gray-300 px-2 py-2 rounded-3xl z-50">
                View leaked tokens belonging to <code>{token.id}</code>
              </div>
            </div>
        </TableContainer>
    )
}
