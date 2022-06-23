import {createToast} from "vercel-toast";

export default function Profile({ data }) {
    const { token, id } = data

    const tokenClick = async (e) => {
        e.stopPropagation();
        createToast("Copied token to clipboard", {
            type: "success",
            timeout: 2000
        });
        await navigator.clipboard.writeText(token);
    }

    return (
        <div className="fixed z-40 grid justify-items-center transform translate-x-[5rem] translate-y-[10rem]">
            <div className="w-[30rem] bg-discordDark pb-5 rounded-3xl">
                <img src={`https://url.wtf/api/banners/user/${id}`} alt={id} className="rounded-3xl"/>

                {token ? (
                    <div
                        className="text-center w-fit text-2xs font-bold font-semibold p-2 rounded-lg inline-flex items-center text-white bg-bgDark"
                        onClick={(e) => tokenClick(e)}
                    >
                        {token}
                    </div>
                ) : ""}
            </div>
        </div>
    )
}
