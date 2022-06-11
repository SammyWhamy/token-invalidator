import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default async function handler(req, res) {
    if(req.method !== 'GET') return res.status(405);

    const { id } = req.query

    if(!id)
        return res.status(400).json({ error: 'Missing id' })

    const tokens = await prisma.token.findMany({where: {id: id}});
    res.json(tokens);
}
