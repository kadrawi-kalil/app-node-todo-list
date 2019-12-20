module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.send('You Are Not Authorized');
    }
    next();
}