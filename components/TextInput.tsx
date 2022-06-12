import { useState } from 'react'
import Link from 'next/link'
import { info } from "../data/config"

export default function TextInput({ data }) {
  const { userData, linkInfo } = data
  const link = userData ? "" : `https://discordapp.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}&response_type=code&scope=${info.scopes.join(" ")}`
  const [input, setInput] = useState('')
  const TokenInvalidator = async (i) => {
    // do stuff with "input"
  }

  return (
    <div>
      <form className="flex items-center relative">
        <input
          className={`placeholder:text-grey-700 focus:border-purple-500 active:border-purple-500 w-full form-input px-4 py-3 ${linkInfo ? 'rounded-t-3xl' : 'rounded-b-3xl'} bg-white border border-white/30 focus:outline-none`}
          type='password'
          placeholder={userData ? linkInfo ? "Enter the link or whatever here..." : "Enter the token to invalidate here..." : "Please login with Discord first!"}
          maxLength={70}
          minLength={20}
          value={input}
          onChange={i => setInput(i.target.value)}
          disabled={!userData}
        />
        {linkInfo ? "" : (<Link href={link}><button
          className='font-semibold rounded-full absolute right-0 px-5 py-3 text-xs font-bold mr-2 text-white bg-bgDark focus:outline-none'
          onClick={TokenInvalidator}
        >
          {userData ? "Invalidate!" : "Login with Discord!"}
        </button></Link>)}
      </form>
    </div>
  )
}
