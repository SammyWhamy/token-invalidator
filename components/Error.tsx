import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link"
export default function Error({error}) {
    const err = error.error
  console.log({error})
  console.log({err})
    return (
        <div className='h-screen relative bg-gradient-to-br from-red-400 to-black overflow-hidden'>
            <div className='animate-slide w-11/12 md:w-3/6 2xl:w-6/12 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-10px bg-gray-700/30 backdrop-opacity-xl rounded-3xl md:p-20 p-10'>

                <h1 className="text-white text-center font-semibold text-3xl mb-8">
                    <FontAwesomeIcon icon={faCircleExclamation} className="mr-2" /> This action has resulted in an error...
                </h1>
                <div className="overflow-x-hidden w-full">
                    <h2 className="landingSectionTitle max-w-max mx-0 text-left relative mb-10 md:w-max"></h2>
                </div>
                <span className="text-white text-xl"><li>{error}</li></span>
                <div className="text-white text-xl mb-5">
                    {[{label: "Go to the home page", url: "/"}, {label: "Open a github issue if you think this was unexpected!", url: "https://github.com/SammyWhamy/token-invalidator/issues/new"}].map((i, index) => {
                        return (
                            <li key={index}><Link href = {i.url || "/"}>{i.label}</Link></li>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
