import Cookies from 'cookies';

export default (req, res) => {
    const cookie = new Cookies(req, res)
    cookie.set('token', null)
    res.redirect('../../')
}
