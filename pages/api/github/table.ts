import {markdownTable} from 'markdown-table';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
const FILE_HEADER = ">### Read the [README](https://github.com/SammyWhamy/invalidate-tokens/blob/main/README.md) file for information on these tokens and why they're here";
const tableHeader = ["Type", "ID", "Token", "Date", "Link"];

export default async function handler(req, res) {
    if(req.method !== 'GET') return res.status(405);

    res.json({
        content: await generateTable(),
    });
}

export async function generateTable() {
    const tokens = await prisma.token.findMany({orderBy: {createdAt: "desc"}});
    const tableRows = tokens.map(token => [
        token.type ? "Bot" : "User",
        `\`${token.id}\``,
        `\`${token.token}\``,
        token.createdAt.toLocaleString().split(',')[0],
        token.link ? `[Link](${token.link})` : "N/A"
    ]);

    return `${FILE_HEADER}\n\n${markdownTable([tableHeader, ...tableRows])}`;
}
