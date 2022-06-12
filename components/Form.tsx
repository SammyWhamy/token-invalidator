import { info } from "../data/config"
import TextInput from "./TextInput"
import LoggedIn from "./LoggedIn";
import LoginButton from "./LoginButton";
import Link from "next/link"

export default function Form({ data }) {
    return (
        <div className='h-screen relative bg-gradient-to-br from-blue-101 to-fuchsia-101 overflow-hidden'>
            <div className='w-11/12 md:w-3/6 2xl:w-2/6 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-10px bg-gray-700/30 backdrop-opacity-xl rounded-lg md:p-20 p-10'>
                <div className="translate-y-[-3.5rem] translate-x-[-3.5rem]">
                    {data ? (<LoggedIn data={data} />) : (<LoginButton/>)}
                </div>

                <h1 className="text-white text-center font-semibold text-3xl mb-8">
                    {info.title}
                </h1>
                <div className="overflow-x-hidden w-full">
                    <h2 className="landingSectionTitle max-w-max mx-0 text-left relative mb-10 md:w-max"></h2>
                </div>
                <div className="text-white text-xl mb-5">
                    <span className="text-white text-xl">{info.subHeading}</span>
                    {info.lists.map((i, index) => {
                        return (
                            <li key={index}><Link href = {i.url || "#"}>{i.label}</Link></li>
                        )
                    })}
                </div>
                <TextInput data={data}/>
            </div>
        </div>
    )
}
