import { PrismaClient } from '@prisma/client'
import {Octokit} from "octokit";
import {config} from "../../../data/config";
import {authenticate} from "../../../util/authenticate";
import {generateTable} from "../github/table";
const prisma = new PrismaClient();

const octokit = new Octokit({
    auth: process.env.GH_PAT,
});

export default async function handler(req, res) {
    if(req.method !== 'POST') return res.status(405);

    const auth = await authenticate(req.headers['authorization'], req.headers['x-submitted-by']);

    if(auth.success == false)
        return res.status(401).json({error: `Unauthenticated: ${auth.error}`});

    const { token, link } = req.body;

    if(!token)
        return res.status(400).json({ error: 'Missing token' })

    const exists = await prisma.token.findFirst({where: {token: token}});
    if(exists)
        return res.status(400).json({ error: 'Token has already been submitted' });

    const tokenType = await validateToken(token);
    if(!tokenType.valid)
        return res.status(400).json({ error: 'Invalid token' });

    const idPart = token.split('.')[0];

    const createdToken = await prisma.token.create({
        data: {
            id: Buffer.from(idPart, 'base64').toString('ascii'),
            token: token,
            link: link || "N/A",
            submitter: auth.submitter,
            type: true// tokenType.type
        }
    });

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
        message: config.tokenCommit.message.replace("{submitter}", auth.submitter),
        committer: {
            name: config.tokenCommit.name,
            email: process.env.COMMIT_EMAIL,
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
