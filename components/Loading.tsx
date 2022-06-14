import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState} from "react";
import { config } from "../data/config"

export default function Loading() {

    const [text, setText] = useState('')
    useEffect(() => {
        setText(config.loadingText[Math.floor(Math.random()*config.loadingText.length)])
    }, [])

    return (
        <div className='h-screen w-screen fixed bg-gradient-to-br from-blue-101 to-fuchsia-101 overflow-auto'>
            <div className='animate-pulse w-11/12 md:w-3/6 2xl:w-6/12 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-10px bg-gray-700/30 backdrop-opacity-xl rounded-3xl md:p-20 p-10'>
                <h1 className="text-white text-center justify-self-center font-semibold text-3xl mb-8 px-3 py-3">
                    <FontAwesomeIcon icon={faSpinner} className="animate-spinner mr-2" /> {text}...
                </h1>
            </div>
        </div>
    )
}
