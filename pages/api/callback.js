import Cookies from 'cookies';
import jwt from 'jsonwebtoken';
import { info } from "../../data/config"
export default async (req, res) => {
  const code = req.query.code;
  const params = new URLSearchParams({
    client_id: process.env.CLIENT_ID,
    code,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.CLIENT_SECRET,
    grant_type: 'authorization_code',
    scope: info.scopes.join(" ")
  })
  console.log(params)
  const token = (await (await fetch(`https://discord.com/api/v10/oauth2/token`, {
    method: 'POST',
    body: params,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })).json())['access_token'];
  const userinfo = (await (await fetch(`https://discord.com/api/v10/users/@me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })).json())
  const user = jwt.sign(userinfo, process.env.JWT_SECRET);
  const cookie = new Cookies(req, res);
  cookie.set('token', user, {
    httpOnly: false
  })
  res.redirect('../../')
}
