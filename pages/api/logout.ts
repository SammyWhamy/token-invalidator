import Cookies from 'cookies';

export default function handler(req, res) {
    const cookie = new Cookies(req, res);
    cookie.set('user', null);
    cookie.set('token', null);
    res.redirect('../../');
}
