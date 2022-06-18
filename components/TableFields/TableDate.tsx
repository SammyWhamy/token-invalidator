import {Token} from "../Table";
import TableContainer from "./TableContainer";

export default function TableDate({ token }: { token: Token }) {
    return (
        <TableContainer color="bg-gray-200">
            <div className="flex-initial flex items-center group relative cursor-pointer">
                  {new Date(token.createdAt).toJSON().slice(0, 10)}
                <div className="absolute text-sm hidden group-hover:block animate-slide left-14 bg-gray-300 px-2 py-2 rounded-3xl z-50">
                  {new Date(token.createdAt).toString()}
                </div>
            </div>
        </TableContainer>
    )
}
