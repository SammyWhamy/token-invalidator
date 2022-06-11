import Link from 'next/link';
import { info } from "../data/config"
export default function LoginButton() {
  const { REDIRECT_URI, CLIENT_ID } = info.fuckNext
  let link = `https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${info.scopes.join(" ")}`
  return (
    <Link href={link}><button className="font-semibold  absolute left-15 py-2 px-4 rounded-full mr-1 mb-1 inline-flex items-center text-white bg-bgDark focus:outline-none">Discord Login</button></Link>
  )
}
