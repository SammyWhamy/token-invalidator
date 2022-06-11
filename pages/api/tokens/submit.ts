import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default async function handler(req, res) {
    if(req.method !== 'POST') return res.status(405);

    if(req.headers['Authorization'] !== process.env.API_TOKEN)
        return res.status(401).json({ error: 'Invalid token' })

    const { token, link, type, submitter } = req.body;

    if(!token || !link)
        return res.status(400).json({ error: 'Missing token or link' })

    const exists = await prisma.token.findFirst({where: {token: token}});
    if(exists)
        return res.status(400).json({ error: 'Token already exists' });

    const idPart = token.split('.')[0];
    const id = Buffer.from(idPart, 'base64').toString('ascii');

    const createdToken = await prisma.token.create({
        data: {id, token, type, link, submitter}
    });

    return res.json(createdToken);
}
