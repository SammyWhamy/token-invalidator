import {faHouse, faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link.js";
import TableDate from "./TableFields/TableDate";
import TableLink from "./TableFields/TableLink";
import TableSubmitter from "./TableFields/TableSubmitter";
import TableToken from "./TableFields/TableToken";
import TableType from "./TableFields/TableType";
import TableUrl from "./TableFields/TableUrl";

export interface Token {
    guid: string,
    createdAt: string,
    id: string,
    token: string,
    type: boolean,
    link: string | null,
    submitter: string,
}

export default function Table({tokenData, page, baseURL}: {tokenData: Token[], page: number, baseURL: string}) {
    const headers = ["TYPE", "ID (HOVER FOR TOKEN)", "HISTORY", "SUBMITTED AT", "SUBMITTER", "LINK"];

    return (
        <div className = "max-h-[80%] scrollbar-hide w-fit min-w-[60%] overflow-y-scroll rounded-3xl m-5 mb-0 w-5/6 mx-auto backdrop-blur-10px bg-gray-700/30 backdrop-opacity-xl rounded-t-3xl">
            <table className="w-[100%]">
                <thead>
                <tr className="text-center border-b-2 border-gray-300 rounded-b-3xl">
                    {headers.map(name => (
                        <th className="px-4 py-2" key={name}>
                            {name}
                        </th>
                    ))}
                </tr>
                </thead>

                <tbody>
                {tokenData.map((token) => (
                    <tr className="rounded-b-3xl" key={token.guid}>
                        <TableType token={token} />
                        <TableToken token={token} />
                        <TableUrl token={token} />
                        <TableDate token={token} />
                        <TableSubmitter token={token} />
                        <TableLink token={token} />
                    </tr>
                ))}
                </tbody>
            </table>

            <div className='min-w-[100%] rounded-b-3xl mx-auto backdrop-blur-10px bg-white/30 backdrop-opacity-xl'>
                <div className="float-left ml-[20rem] text-white my-[0.7rem] mx-6 cursor-pointer">
                    <Link href={page === 0 ? baseURL : `${baseURL}?page=${page}`}>
                        <FontAwesomeIcon icon={faArrowLeft} size="2x"/>
                    </Link>
                </div>

                <div className="float-right mr-[20rem] text-white my-[0.7rem] mx-6 cursor-pointer">
                    <Link href={page === 0 ? `${baseURL}?page=2` : `${baseURL}?page=${page+2}`}>
                        <FontAwesomeIcon icon={faArrowRight} size="2x"/>
                    </Link>
                </div>

                <h1 className="text-white text-center justify-self-center font-semibold text-3xl mt-2 px-3 py-3">
                    Page
                </h1>
            </div>
        </div>
    )
}
