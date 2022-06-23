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

export default function Table({tokenData}: {tokenData: Token[]}) {
    const headers = ["TYPE", "ID (HOVER FOR TOKEN)", "HISTORY", "SUBMITTED AT", "SUBMITTER", "LINK"];

    return (
        <div className = "max-h-[80%] overflow-y-scroll rounded-3xl m-5 w-5/6 mx-auto backdrop-blur-10px bg-gray-700/30 backdrop-opacity-xl rounded-3xl">
            <table>
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
        </div>
    )
}
