import Link from 'next/link';

export default function LoggedIn({data}) {
    return (
        <Link href="/api/logout">
            <button className="font-semibold  absolute left-15 py-2 pr-3 px-4 rounded-full mr-1 mb-1 inline-flex items-center text-white bg-bgDark focus:outline-none">
                <img
                    className="w-8 h-8 mr-2 ml-[-0.6rem] mt-[-100%] mb-[-100%]"
                    src={`https://cdn.discordapp.com/avatars/${data?.id}/${data?.avatar}.webp`}
                    alt={data?.username}
                    style={{ borderRadius: '50%', position: 'relative', textAlign: 'center' }}/>
                <span>
                    {data ? `${data.username}#${data.discriminator}` : ""}
                </span>
            </button>
        </Link>
    )
}
