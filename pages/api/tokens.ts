import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default async function handler(req, res) {
    if(req.method !== 'GET') return res.status(405);

    const skip = parseInt(req.query.skip) || 0;
    const take = parseInt(req.query.take) || 100;

    if(skip < 0 || take < 1)
        return res.status(400).json({ error: 'Invalid skip or take' });

    if(take > 1000)
        return res.status(400).json({ error: 'Take cannot be greater than 1000' });

    const tokens = await prisma.token.findMany({
        orderBy: {
            createdAt: "desc"
        },
        skip: skip,
        take: take,
    });

    res.json(tokens);
}
