import { PrismaClient } from '@prisma/client'
import {Octokit} from "octokit";
import {config} from "../../../data/config";
import {authenticate} from "../../../util/authenticate";
import {generateTable} from "../github/table";
import {validateToken} from "./submit";
const prisma = new PrismaClient();

const octokit = new Octokit({
    auth: process.env.GH_PAT,
});

export default async function handler(req, res) {
    if(req.method !== 'POST') return res.status(405);

    const auth = await authenticate(req.headers['authorization'], req.headers['x-submitted-by']);

    if(auth.success == false)
        return res.status(401).json({error: `Unauthenticated: ${auth.error}`});

    const { tokens, link }: { tokens: string[], link: string } = req.body;

    if(!tokens)
        return res.status(400).json({ error: 'Missing token array' });

    if(tokens.length > 100)
        return res.status(400).json({ error: 'Token array too long' });

    const mappedTokens = (await Promise.all(tokens.map(async (token) => {
        const tokenType = await validateToken(token);
        if(!tokenType.valid)
            return null;

        const idPart = token.split('.')[0];

        return {
            id: Buffer.from(idPart, 'base64').toString('ascii'),
            token: token,
            link: link || "N/A",
            submitter: auth.submitter,
            type: tokenType.type
        }
    }))).filter((token) => token != null);

    if(mappedTokens.length == 0)
        return res.status(400).json({ error: 'No valid tokens' });

    const createdTokens = await prisma.token.createMany({
        data: mappedTokens,
        skipDuplicates: true
    });

    if(createdTokens.count === 0)
        return res.status(400).json({ error: 'No unique tokens' });

    const table = await generateTable();

    const oldFile = await octokit.request(`GET /repos/${config.tokenRepo.owner}/${config.tokenRepo.name}/contents/${config.tokenRepo.path}`, {
        owner: config.tokenRepo.owner,
        repo: config.tokenRepo.name,
        path: config.tokenRepo.path,
    });

    await octokit.request(`PUT /repos/${config.tokenRepo.owner}/${config.tokenRepo.name}/contents/${config.tokenRepo.path}`, {
        owner: config.tokenRepo.owner,
        repo: config.tokenRepo.name,
        path: config.tokenRepo.path,
        message: config.tokenCommit.manyMessage.replace("{submitter}", auth.submitter).replace("{count}", `${createdTokens.count}`),
        committer: {
            name: config.tokenCommit.name,
            email: process.env.COMMIT_EMAIL,
        },
        content: Buffer.from(table).toString('base64'),
        sha: oldFile.data.sha,
    });

    return res.json(createdTokens);
}
