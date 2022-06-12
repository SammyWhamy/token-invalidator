import {Octokit} from "octokit";
import {config} from "../../../data/config";
import {generateTable} from "./table";

const octokit = new Octokit({
    auth: process.env.GH_PAT,
});

export default async function handler(req, res) {
    if(req.method !== 'POST') return res.status(405);

    if(req.headers['authorization'] !== `Bearer ${process.env.API_TOKEN}`)
        return res.status(401).json({ error: 'Invalid token' })

    const table = await generateTable();

    const oldFile = await octokit.request(`GET /repos/${config.tokenRepo.owner}/${config.tokenRepo.name}/contents/${config.tokenRepo.path}`, {
        owner: config.tokenRepo.owner,
        repo: config.tokenRepo.name,
        path: config.tokenRepo.path,
    });

    const response = await octokit.request(`PUT /repos/${config.tokenRepo.owner}/${config.tokenRepo.name}/contents/${config.tokenRepo.path}`, {
        owner: config.tokenRepo.owner,
        repo: config.tokenRepo.name,
        path: config.tokenRepo.path,
        message: "Manual sync performed",
        committer: {
            name: config.tokenCommit.name,
            email: config.tokenCommit.email,
        },
        content: Buffer.from(table).toString('base64'),
        sha: oldFile.data.sha,
    });

    return res.json(response);
}
