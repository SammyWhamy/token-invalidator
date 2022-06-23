import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default async function handler(req, res) {
    if(req.method !== 'GET') return res.status(405);
    const tokens = await prisma.token.count();
    res.json({ count: tokens });
}
