import { PrismaClient } from '@prisma/client'
import {Octokit} from "octokit";
import {generateTable} from "../github/table";
const prisma = new PrismaClient();

const octokit = new Octokit({
    auth: process.env.GH_PAT,
});

export default async function handler(req, res) {
    if(req.method !== 'POST') return res.status(405);

    if(req.headers['authorization'] !== `Bearer ${process.env.API_TOKEN}`)
        return res.status(401).json({ error: 'Invalid token' })

    const { token, link, submitter } = req.body;

    if(!token || !link)
        return res.status(400).json({ error: 'Missing token or link' })

    const exists = await prisma.token.findFirst({where: {token: token}});
    if(exists)
        return res.status(400).json({ error: 'Token already exists' });

    const tokenType = await validateToken(token);
    if(!tokenType.valid)
        return res.status(400).json({ error: 'Invalid token' });

    const idPart = token.split('.')[0];
    const id = Buffer.from(idPart, 'base64').toString('ascii');

    const createdToken = await prisma.token.create({
        data: {id, token, link, submitter, type: tokenType.type}
    });

    const table = await generateTable();

    const oldFile = await octokit.request("GET /repos/SammyWhamy/invalidate-tokens/contents/autotokens.md", {
        owner: "SammyWhamy",
        repo: "invalidate-tokens",
        path: "autotokens.md",
    });

    await octokit.request("PUT /repos/SammyWhamy/invalidate-tokens/contents/autotokens.md", {
        owner: "SammyWhamy",
        repo: "invalidate-tokens",
        path: "autotokens.md",
        message: `Token added by ${submitter}`,
        committer: {
            name: 'TokenInvalidator',
            email: 'sam.teeuwisse123@gmail.com',
        },
        content: Buffer.from(table).toString('base64'),
        sha: oldFile.data.sha,
    });

    return res.json(createdToken);
}

async function validateToken(token: string): Promise<{valid: boolean, type?: boolean}> {
    const botResponse = await fetch('https://discord.com/api/users/@me', {
        headers: {
            Authorization: `Bot ${token}`,
        }
    });

    if(botResponse.status === 200)
        return {valid: true, type: true};

    const userResponse = await fetch('https://discord.com/api/users/@me', {
        headers: {
            Authorization: `${token}`,
        }
    });

    if(userResponse.status === 200)
        return {valid: true, type: false};

    return {valid: false};
}
