import passport from 'passport';
import  LocalStrategy  from "passport-local";
import userApiService from "../service/userApiService";


const configPassport =  () => {

    passport.use(new LocalStrategy(async function verify(username, password, cb) {
        // db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, user) {
        //   if (err) { return cb(err); }
        //   if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }
      
        //   crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        //     if (err) { return cb(err); }
        //     if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
        //       return cb(null, false, { message: 'Incorrect username or password.' });
        //     }
        //     return cb(null, user);
        //   });
        // });

        const userData = {
            email: username,
            password
        }

        let res = await userApiService.handleUserLogin(userData);
        console.log(res)
        if(res && +res.errorCode === 0) {
            return cb(null, res.data);
        }else {
            return cb(null, false, { message: res.message });
        }
    
        
      }));

}

module.exports = {configPassport}