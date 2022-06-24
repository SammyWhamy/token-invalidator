import {faHouse} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Head from 'next/head'
import Link from "next/link.js";
import {useRouter} from "next/router";
import useSWR from 'swr'
import Table from '../../../components/Table';
import Loading from '../../../components/Loading'
import Error from '../../../components/Error'
import EmptyTable from '../../../components/EmptyTable'

const fetcher = (...args: [string, ...any]) => fetch(...args).then((res) => res.json())

export default function GetUser() {
    const router = useRouter();
    const { id } = router.query;
    const page = router.query.page ? parseInt(router.query.page as string) - 1 : 0;
    if (page < 0)
        router.push(`/history/user/${id}`);

    const { error, data } = useSWR(id ? `/api/tokens/user/${id}?skip=${page * 100}&take=${100}` : null, fetcher);
    const { data: countData, error: countError } = useSWR(`/api/tokens/user/${id}/count`, fetcher);

    if (error || countError) return <Error error = {"Couldn't fetch details properly"}/>
    if (!data || !countData ) return <Loading />

    if (countData.count === 0) return <EmptyTable id = {id}/>

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
                        {`${id}'s Token History`} - {countData.count} {countData.count === 1 ? "Token" : "Tokens"}
                    </h1>
                </div>
                <Table tokenData={data} page={page} baseURL={`/history/user/${id}`} />
            </div>
        </>
    );
}
