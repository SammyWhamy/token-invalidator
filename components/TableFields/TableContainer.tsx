import {ReactNode} from "react";

export default function TableContainer({ children, color }: { children: ReactNode, color: string }) {
    return (
        <td className="px-4 py-3" key="type">
            <span className="block text-center m-auto">
                <div className="whitespace-nowrap relative inline-block px-3 py-1 font-semibold text-black leading-tight">
                    <div className="relative inline-block px-3 py-1 font-semibold text-black leading-tight">
                        <span aria-hidden className={`absolute inset-0 opacity-50 rounded-full ${color}`}/>
                        <span className="relative">
                            <code>
                                {children}
                            </code>
                        </span>
                    </div>
                </div>
            </span>
        </td>
    )
}
