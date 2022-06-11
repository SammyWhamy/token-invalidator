import { useState } from 'react'

export default function Home() {
    const [input, setInput] = useState('')
    const submit = async (i) => {

    }

    return (
        <div className='flex place-content-center bg-slate-600'>
            <form className='flex mt-[25%] mb-auto'>
                <input className='p-2.5 rounded-l-lg w-[700px]' id='token' type='text' placeholder='Enter the token to invalidate' value={input} onChange={i => setInput(i.target.value)}/>
                <button className='p-2.5 rounded-r-lg bg-red-500 text-white' type='submit' onClick={submit}>
                    Invalidate!
                </button>
            </form>
        </div>
    )
}
