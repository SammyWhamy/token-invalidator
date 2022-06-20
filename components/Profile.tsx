import {useState} from "react"
export default function Profile({ data }) {
    const { token, id } = data
    return (
        <div className="fixed top-1/2 left-1/2 z-40  grid justify-items-center transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-discordDark pb-5 rounded-3xl">
                <img src={`https://url.wtf/api/banners/user/${id}`} alt={id} className="rounded-3xl"></img>
                {
                    token ? (
                        <div className="text-center text-sm font-bold font-semibold py-2 px-4 rounded-lg inline-flex items-center text-white bg-bgDark">
                            {token}
                        </div>
                    ) : ""
                }
            </div>
        </div>
    )
}