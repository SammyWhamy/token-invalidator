import Link from "next/link"
export default function Table({ tokenData }) {
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
      <table className="rounded-3xl m-5 w-5/6 mx-auto  backdrop-blur-10px bg-white/30 backdrop-opacity-xl rounded-3xl">
        <tr className="text-center border-b-2 border-gray-300 rounded-b-3xl">
          {["Date", "id", "type", "link", "submitter"].map((i, ind) => {
            return (<th className="px-4 py-2" key={ind}> {i.toUpperCase()}  {i == "token" ? (<span>
              <div className="text-center justify-self-center align-items-center fixed inline-block px-3 py-1 font-semibold text-gray-700 leading-tight" key={ind+ind}>
                <span aria-hidden className="relative inset-0 opacity-50 rounded-full bg-gray-200"></span>
                <span className="relative"><code>{tokenData.length} tokens invalidated!</code></span>
              </div></span>) : ""} </th>)
          })}
        </tr>
        {Object.values(tokenData).map((s, index) => {
          return (
            <tr className="rounded-b-3xl">
              {Object.entries(s).filter(c => ["createdAt", "token", "type", "link", "submitter"].includes(c[0])).map((i, index) => {
                return (<td className="px-4 py-3" key={index}>
                  <span>
                    <div className="whitespace-nowrap relative inline-block px-3 py-1 font-semibold text-black leading-tight" key={index+index}>
                      <div className="relative inline-block px-3 py-1 font-semibold text-black leading-tight">
                        <span aria-hidden className={`absolute inset-0 opacity-50 rounded-full ${i[0] == "type" ? i[1] ? colours.type["1"] : colours.type["2"] : colours[i[0]]}`}></span>
                        <span className="relative">
                          <code>
                            {i[0] == "link" && i[1]?.startsWith("http") ? (<Link href={i[1]}>{(new URL(i[1])).hostname}</Link>) : i[0] == "token" ? (<div className="flex-initial flex items-center group relative cursor-pointer">{decodeURIComponent(escape(atob(i[1].split(".")[0])))}<div className="absolute text-sm hidden group-hover:block left-28 bg-gray-300 px-2 py-2 rounded-3xl z-50"> {i[1]} </div></div>) : i[0] == "createdAt" ? `${new Date(i[1]).toJSON().slice(0, 10)}` : i[0] == "type" ? i[1] ? "Bot" : "User" : i[1]}
                          </code>
                        </span>
                      </div>
                    </div>
                  </span>
                </td>)
              })}
            </tr>
          )
        })}
      </table>
    </div>
  )
}
