import { useState } from 'react'

export default function TextInput({ data }) {
    const [input, setInput] = useState('')
    const TokenInvalidator = async (i) => {
        // do stuff with "input"
    }

    return (
        <div>
            <form className="flex items-center relative">
                <input
                    className='placeholder:text-white text-white focus:border-purple-500 active:border-purple-500 w-full form-input px-4 py-3 rounded-md bg-transparent border border-white/30 focus:outline-none'
                    type='password'
                    placeholder={data ? "Enter the token to invalidate here..." : "Log in with Discord!"}
                    maxLength={70}
                    minLength={20}
                    value={input}
                    onChange={i => setInput(i.target.value)}
                    disabled={!data}
                />
                <button
                    className='font-semibold rounded-full absolute right-0 px-5 py-3 text-xs font-bold mr-3 text-white bg-bgDark focus:outline-none'
                    onClick={TokenInvalidator}
                    disabled={!data}
                >
                    {data ? "Invalidate!" : "Log into discord!"}
                </button>
            </form>
        </div>
    )
}
