import Link from "next/link"

interface Token {
    guid: string,
    createdAt: string,
    id: string,
    token: string,
    type: boolean,
    link: string | null,
    submitter: string,
}

export default function Table({tokenData}: {tokenData: Token[]}) {
    const colours = {
        type: {
            1: 'bg-green-700',
            2: 'bg-orange-700'
        },
        token: 'bg-gray-200',
        id: 'bg-gray-200',
        createdAt: 'bg-gray-700',
        submitter: 'bg-gray-700',
        link: 'bg-gray-700'
    }

    return (
        <div>
            <table className="max-w-[60%] rounded-3xl m-5 w-5/6 mx-auto backdrop-blur-10px bg-white/30 backdrop-opacity-xl rounded-3xl">
                <thead>
                <tr className="text-center border-b-2 border-gray-300 rounded-b-3xl">
                    {["type", "id (hover for token)", "submitted at", "submitter", "link"].map((i, ind) => {
                        return (
                            <th className="px-4 py-2" key={ind}>
                                {i.toUpperCase()}
                                {i == "token" ? (
                                    <span>
                                        <div
                                            className="text-center justify-self-center align-items-center fixed inline-block px-3 py-1 font-semibold text-gray-700 leading-tight"
                                            key={ind + ind}
                                        >
                                            <span aria-hidden className="relative inset-0 opacity-50 rounded-full bg-gray-200"></span>
                                            <span className="relative"><code>{tokenData.length} tokens invalidated!</code></span>
                                        </div>
                                    </span>
                                ) : ""}
                            </th>
                        )
                    })}
                </tr>
                </thead>

                <tbody>
                {tokenData
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((token) => {
                        return (
                            <tr className="rounded-b-3xl" key={token.guid}>
                                {["type", "token", "createdAt", "submitter", "link"].map((key) => {
                                    return (
                                        <td className="px-4 py-3" key={key}>
                                        <span className="block text-center m-auto">
                                            <div className="whitespace-nowrap relative inline-block px-3 py-1 font-semibold text-black leading-tight">
                                                <div className="relative inline-block px-3 py-1 font-semibold text-black leading-tight">
                                                    <span
                                                        aria-hidden
                                                        className={`absolute inset-0 opacity-50 rounded-full ${key == "type" ? token[key] ? colours.type["1"] : colours.type["2"] : colours[key]}`}
                                                    >
                                                    </span>
                                                    <span className="relative">
                                                        <code>
                                                            {key == "link" && token[key]?.startsWith("http") ? (
                                                                <Link href={token.link}>{(new URL(token.link)).hostname}</Link>
                                                            ) : key == "token" ? (
                                                                <div className="flex-initial flex items-center group relative cursor-pointer">
                                                                    {token.id}
                                                                    <div className="absolute text-sm hidden group-hover:block left-28 bg-gray-300 px-2 py-2 rounded-3xl z-50">
                                                                        {token.token}
                                                                    </div>
                                                                </div>
                                                            ) : key == "createdAt" ? (
                                                                `${new Date(token.createdAt).toJSON().slice(0, 10)}`
                                                            ) : key == "type" ? (
                                                                token.type ? "Bot" : "User"
                                                            ) : key == "submitter" ? (
                                                                <Link href={`/history/user/${token.submitter}`}>{token.submitter}</Link>
                                                            ) : (
                                                                "N/A"
                                                            )}
                                                        </code>
                                                    </span>
                                                </div>
                                            </div>
                                        </span>
                                        </td>
                                    )}
                                )}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
