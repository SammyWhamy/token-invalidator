import {Octokit} from "octokit";
import {generateTable} from "./table";

const octokit = new Octokit({
    auth: process.env.GH_PAT,
});

export default async function handler(req, res) {
    if(req.method !== 'POST') return res.status(405);

    if(req.headers['authorization'] !== `Bearer ${process.env.API_TOKEN}`)
        return res.status(401).json({ error: 'Invalid token' })

    const table = await generateTable();

    const oldFile = await octokit.request("GET /repos/SammyWhamy/invalidate-tokens/contents/autotokens.md", {
        owner: "SammyWhamy",
        repo: "invalidate-tokens",
        path: "autotokens.md",
    });

    const response = await octokit.request("PUT /repos/SammyWhamy/invalidate-tokens/contents/autotokens.md", {
        owner: "SammyWhamy",
        repo: "invalidate-tokens",
        path: "autotokens.md",
        message: "Manual sync performed",
        committer: {
            name: 'TokenInvalidator',
            email: 'sam.teeuwisse123@gmail.com',
        },
        content: Buffer.from(table).toString('base64'),
        sha: oldFile.data.sha,
    });

    return res.json(response);
}
