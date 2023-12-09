import passport from 'passport';
import  LocalStrategy  from "passport-local";
import userApiService from "../service/userApiService";


const configPassport =  () => {

    passport.use(new LocalStrategy(async function verify(username, password, cb) {
        
        const userData = {
            email: username,
            password
        }

        let res = await userApiService.handleUserLogin(userData);
        // console.log(res)

        if(res && +res.errorCode === 0) {
            return cb(null, res.data);
        }else {
            return cb(null, false, { message: res.message });
        }
    
        
      }));

}

const handleLogout = (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        return res.redirect('/');
      });
}

module.exports = {configPassport, handleLogout}