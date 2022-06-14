import Head from 'next/head'
import {useRouter} from "next/router";
import useSWR from 'swr'
import Table from '../../../components/Table';
const fetcher = (...args: [string, ...any]) => fetch(...args).then((res) => res.json())

export default function GetUser() {
    const router = useRouter();
    const { id } = router.query;
    const { error, data } = useSWR(id ? `https://token-invalidator.vercel.app/api/tokens/user/${id}` : null, fetcher);
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>
    return (
        <>
            <Head>
                <title>{id} - History</title>
            </Head>
            <div className='h-screen w-screen fixed bg-gradient-to-br from-blue-101 to-fuchsia-101 overflow-auto'>
                <div className='rounded-3xl m-5 w-5/6 mx-auto backdrop-blur-10px bg-white/30 backdrop-opacity-xl rounded-3xl'>
                    <h1 className="text-white text-center justify-self-center font-semibold text-3xl mb-8 px-3 py-3">
                        {`${id}'s Token History`}
                    </h1>
                </div>
                <Table tokenData={data} />
            </div>
        </>
    );
}
