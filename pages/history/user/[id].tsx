import {faHouse} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Head from 'next/head'
import Link from "next/link.js";
import {useRouter} from "next/router";
import useSWR from 'swr'
import Table from '../../../components/Table';
import Loading from '../../../components/Loading'
import Error from '../../../components/Error'

const fetcher = (...args: [string, ...any]) => fetch(...args).then((res) => res.json())

export default function GetUser() {
    const router = useRouter();
    const { id } = router.query;
    const { error, data } = useSWR(id ? `/api/tokens/user/${id}` : null, fetcher);
    if (error) return <Error error = {"Couldn't fetch details properly"}/>
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
                        {`${id}'s Token History`}
                    </h1>
                </div>
                <Table tokenData={data} />
            </div>
        </>
    );
}
