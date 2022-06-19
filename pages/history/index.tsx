import {faHouse} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Head from 'next/head'
import Link from "next/link";
import useSWR from 'swr'
import Table from '../../components/Table';
import Loading from '../../components/Loading'
import Error from '../../components/Error'

const fetcher = (...args: [string, ...any]) => fetch(...args).then((res) => res.json())

function History() {
    //const { data, error } = useSWR('/api/tokens', fetcher)
    //if (error) return <Error error = {"Couldn't fetch details properly"}/>
    const data = Array(10000).fill({
        guid: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
        createdAt: '2022-06-12T17:47:32.541Z',
        token: 'OTgwMTU5NTg0MDI5MjUzNzI0.GKzXAv._N58c3c04xx3Z7TtSwMyAixm_kTnluyyritc8Q',
        type: true,
        link: 'https://replit.com/@aabdllhlSlHy',
        submitter: '560821786011369472'
    })
    if (!data) return <Loading />
    return (
        <>
            <Head>
                <title>Token History</title>
            </Head>
            <div className='h-screen w-screen fixed bg-gradient-to-br from-blue-101 to-fuchsia-101 overflow-auto'>
                <div className='max-w-[60%] rounded-3xl m-5 w-5/6 mx-auto backdrop-blur-10px bg-white/30 backdrop-opacity-xl rounded-3xl'>
                    <div className="float-left text-white my-[0.7rem] mx-6 cursor-pointer">
                        <Link href="/">
                            <FontAwesomeIcon icon={faHouse} size="2x"/>
                        </Link>
                    </div>

                    <h1 className="text-white text-center justify-self-center font-semibold text-3xl mb-8 px-3 py-3">
                        Token History - {data.length} Tokens
                    </h1>
                </div>
                <Table tokenData={data} />
            </div>

        </>
    );
}
export default History
