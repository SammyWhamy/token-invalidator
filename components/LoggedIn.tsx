import Link from 'next/link';
export default function LoggedIn({ data }) {
  return (
    <div className="inline-block">
      <Link href="/api/logout">
        <button className="font-semibold py-2 pr-3 px-4 rounded-full mr-1 inline-flex items-center text-white bg-bgDark focus:outline-nonez">
          <img
            className="w-8 h-8 mr-2 ml-[-0.6rem] mt-[-100%] mb-[-100%]"
            src={`https://cdn.discordapp.com/avatars/${data?.id}/${data?.avatar}.webp`}
            alt={data?.username}
            style={{ borderRadius: '50%', position: 'relative', textAlign: 'center' }} />
          <span>
            {data ? `${data.username}#${data.discriminator}` : ""}
          </span>
        </button>
      </Link>
      <Link href={`/pages/history/users/${data.id}`}>
        <button className="font-semibold py-2 pr-3 px-4 rounded-full mr-1 inline-flex items-center text-white bg-bgDark focus:outline-nonez">
          <img
            className="w-8 h-8 mr-2 ml-[-0.6rem] mt-[-100%] mb-[-100%]"
            src={`https://cdn.discordapp.com/avatars/${data?.id}/${data?.avatar}.webp`}
            alt={data?.username}
            style={{ borderRadius: '50%', position: 'relative', textAlign: 'center' }} />
          <span>
            Your tokens
          </span>
        </button>
      </Link>
    </div>
  )
}
