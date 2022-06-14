import {faClockRotateLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from 'next/link';
export default function LoggedIn({ data }) {
    return (
        <div className="inline-flex">
            <Link href="/api/logout">
                <button className="font-semibold py-2 pr-[0.95rem] px-4 rounded-full mr-1 inline-flex items-center text-white bg-bgDark focus:outline-none">
                    <img
                        className="w-8 h-8 mr-2 ml-[-0.6rem] mt-[-100%] mb-[-100%]"
                        src={`https://cdn.discordapp.com/avatars/${data?.id}/${data?.avatar}.webp`}
                        alt={data?.username}
                        style={{ borderRadius: '50%', position: 'relative', textAlign: 'center' }} />
                    <span>
                        {data ? `${data.username}#${data.discriminator} | Log out` : ""}
                    </span>
                </button>
            </Link>

            <Link href={`/history/user/${data.id}`}>
                <button className="ml-1 font-semibold py-2 pr-3 px-4 rounded-full inline-flex items-center text-white bg-bgDark focus:outline-none">
                    <div className="mr-2 ml-[-0.5rem] mt-[-100%] mb-[-100%] translate-y-[0.05rem]">
                        {/* @ts-ignore */}
                        <FontAwesomeIcon icon={faClockRotateLeft} size="xl" className="w-8 h-8" />
                    </div>
                    <span className="translate-x-[-0.3rem]">
                        Your submissions
                    </span>
                </button>
            </Link>
        </div>
    )
}
