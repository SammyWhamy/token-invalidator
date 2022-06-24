import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
const FILE_HEADER = ">### Read the [README](https://github.com/SammyWhamy/invalidate-tokens/blob/main/README.md) file for information on these tokens and why they're here\nUse `ctrl`+`f` and search for your bots ID to find where the token was found.  \n For a full history, visit https://invalidate.vercel.app/history";

export default async function handler(req, res) {
    if(req.method !== 'GET') return res.status(405);

    res.json({
        content: await generateTable(),
    });
}

export async function generateTable() {
    const tokens = await prisma.token.findMany({
        orderBy: {
            createdAt: "desc"
        },
        select: {
            id: true,
            token: true,
        }
    });

    const idList = tokens.slice(0, 500).map(token => `- [${token.id}](https://invalidate.vercel.app/history?id=${token.id})`).join("\n");
    const tokenList = tokens.map(token => `[](${token.token}`).join("\n");

    return `${FILE_HEADER}  \n${idList}\n${tokenList}`;
}
