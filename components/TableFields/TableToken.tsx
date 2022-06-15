import 'vercel-toast/dist/vercel-toast.css'
import {createToast} from "vercel-toast";
import {Token} from "../Table";
import TableContainer from "./TableContainer";

export default function TableToken({ token }: { token: Token }) {
    const idClick = async () => {
        createToast("Copied ID to clipboard", {
            type: "success",
            timeout: 2000
        });
        await navigator.clipboard.writeText(token.id);
    }

    return (
        <TableContainer color="bg-gray-200">
            <div className="flex-initial flex items-center group relative cursor-pointer" onClick={idClick}>
                {token.id}
                <div className="absolute text-sm hidden group-hover:block left-28 bg-gray-300 px-2 py-2 rounded-3xl z-50">
                    {token.token}
                </div>
            </div>
        </TableContainer>
    )
}
