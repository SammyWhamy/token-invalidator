import Link from 'next/link';

export default function LoggedIn({data}) {
  return (
    <Link href="/api/logout"><button className="font-semibold  absolute left-15 py-2 px-4 rounded-full mr-1 mb-1 inline-flex items-center text-white bg-bgDark focus:outline-none"><img className = "w-4 h-4 mr-2" src={`https://cdn.discordapp.com/avatars/${data?.id}/${data?.avatar}.webp`} alt={data?.username} style={{ borderRadius: '50%', position: 'relative', textAlign: 'center' }}></img><span>{data?.username}</span></button></Link>
  )
}
