import Link from 'next/link';
import { info } from "../data/config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

export default function LoginButton() {
    const link = `https://discordapp.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}&response_type=code&scope=${info.scopes.join(" ")}`;

    return (
        <Link href={link}>
            <button className="font-semibold  absolute left-15 py-2 px-4 rounded-full mr-1 mb-1 inline-flex items-center text-white bg-bgDark focus:outline-none">
                <FontAwesomeIcon icon={faDiscord} className="mr-2" /> Login with Discord
            </button>
        </Link>
    )
}
