import { info } from "../data/config"
import TextInput from "./TextInput"
import LoggedIn from "../components/LoggedIn";
import LoginButton from "../components/LoginButton";
export default function Form({ data }) {
  return (
    <div className='h-screen relative bg-gradient-to-br from-green-700 to-red-500 overflow-hidden'>

      <div className='w-11/12 md:w-3/6 2xl:w-2/6 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-10px bg-white/30 rounded-lg md:p-20 p-10'>
        {data ? (<LoggedIn data={data} />) : (<LoginButton data={data} />)}
        <h1 className="text-white text-center font-semibold text-3xl mb-8">
          {info.title}
        </h1>
        <div className="overflow-x-hidden w-full">
          <h2 className="landingSectionTitle max-w-max mx-0 text-left relative mb-10 md:w-max"></h2>
        </div>
        <p className="text-white text-xl mb-5">
          <h2 className="text-white text-xl">{info.subHeading}</h2>
          {info.lists.map((i, index) => {
            return (
              <li key={index}>{i}</li>
            )
          })}
        </p>
        <TextInput data={data}/>
      </div>
    </div>
  )
}
