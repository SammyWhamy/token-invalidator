import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link"
export default function EmptyTable({id}) {
    return (
        <div className='h-screen relative bg-gradient-to-br from-yellow-400 to-black overflow-hidden'>
            <div className='animate-slide w-11/12 md:w-3/6 2xl:w-6/12 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-10px bg-gray-700/30 backdrop-opacity-xl rounded-3xl md:p-20 p-10'>

                <h1 className="text-white text-center font-semibold text-3xl mb-8">
                    <FontAwesomeIcon icon={faExclamation} className="mr-2" /> <code>{id}</code> has submitted <code>0</code> tokens so far...
                </h1>
                <div className="overflow-x-hidden w-full">
                    <h2 className="landingSectionTitle max-w-max mx-0 text-left relative mb-10 md:w-max"></h2>
                </div>
                <div className="text-white text-xl mb-5">
                    {[{label: "Go to the home page", url: "/"}, {label: "View the total list of tokens invalidated", url: "/history"}].map((i, index) => {
                        return (
                            <li key={index}><Link href = {i.url || "/"}>{i.label}</Link></li>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
