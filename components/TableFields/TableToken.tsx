import 'vercel-toast/dist/vercel-toast.css'
import {createToast} from "vercel-toast";
import {Token} from "../Table";
import TableContainer from "./TableContainer";
import Profile from "../Profile"
import { useState } from "react"

export default function TableToken({ token }: { token: Token }) {
    const [visibleProfile, setVisibleProfile] = useState(false);
    const idClick = async () => {
        createToast("Copied ID to clipboard", {
            type: "success",
            timeout: 2000
        });
        await navigator.clipboard.writeText(token.id);
    }

    return (
        <TableContainer color="bg-gray-200">
            <div className="flex-initial flex items-center group relative cursor-pointer" onClick={idClick} onMouseEnter={() => setVisibleProfile(true)} onMouseLeave={() => setVisibleProfile(false)}>
                {token.id}
                {visibleProfile ? (<Profile data = {{id: token.id, token: token.token}}/>) : ""}
            </div>
        </TableContainer>
    )
}
