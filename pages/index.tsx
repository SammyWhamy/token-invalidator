import Form from '../components/Form';
import Head from 'next/head'
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export async function getServerSideProps(ctx) {
    let key;

    try {
        const cookies = cookie.parse(ctx.req.headers.cookie);
        key = jwt.verify(cookies.token, process.env.JWT_SECRET)
    } catch {}

    return {props: {user: key || null}};
}

export default function Index({ ...key }) {
    const data = key.user;

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="site to invaildate tokens" />
                <meta name="author" content="the author" />
                <meta name="theme-colour" content="#123456" />
                <title>Token invalidator</title>
            </Head>

            <div className="m-auto w-full">
                <div className="p-0 space-y-10">
                    <Form data = {data} />
                </div>
            </div>
        </>
    );
}
