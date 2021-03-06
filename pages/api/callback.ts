import Cookies from 'cookies';
import jwt from 'jsonwebtoken';
import { config } from "../../data/config"

export default async function handler(req, res) {
    const params = new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        code: req.query.code,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URL,
        grant_type: 'authorization_code',
        scope: config.scopes.join(" ")
    });

    const token = (await (await fetch(`https://discord.com/api/v10/oauth2/token`, {
        method: 'POST',
        body: params,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })).json())['access_token'];

    const user = (await (await fetch(`https://discord.com/api/v10/users/@me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })).json());

    if(user?.code === 0)
        return res.redirect('../../');

    const cookie = new Cookies(req, res);
    cookie.set('user', jwt.sign({...user, token}, process.env.JWT_SECRET), {
        httpOnly: false
    });

    res.redirect('../../');
}
