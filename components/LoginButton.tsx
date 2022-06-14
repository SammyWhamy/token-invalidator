import Link from 'next/link';
import { config } from "../data/config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

export default function LoginButton() {
    function generateState() {
      let state = ""
      const randomNumber = Math.floor(Math.random() * 10);
      for (let i = 0; i < 20 + randomNumber; i++) {
        state += String.fromCharCode(33 + Math.floor(Math.random() * 94));
      }
      return state
    }
    const state = btoa(generateState())
    //state is not ready yet
    const link = `https://discordapp.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&prompt=none&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}&response_type=code&scope=${config.scopes.join(" ")}`;

    return (
        <Link href={link}>
            <button className="font-semibold  absolute left-15 py-2 px-4 rounded-full mr-1 mb-1 inline-flex items-center text-white bg-bgDark focus:outline-none">
                <FontAwesomeIcon icon={faDiscord} className="mr-2" /> Login with Discord
            </button>
        </Link>
    )
}
