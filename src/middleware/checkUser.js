
const isLogin = (req, res, next) => {

    // console.log('check path : ', req.path);

    if (req.isAuthenticated()) {

        if (req.path === '/login') {
            return res.redirect("/");
        }
        // req.isAuthenticated() will return true if the user is logged in
        return next();
        
    }

    if (req.path === '/login') {
        return next();
    }

    return res.redirect("/login");
};

module.exports = { isLogin };