
import session  from "express-session";
import passport from "passport";
import Sequelize from "sequelize";



const configSession = (app) => {
  
    // initalize sequelize with session store
    const SequelizeStore = require("connect-session-sequelize")(session.Store);

    // create database,
    const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect:  process.env.DB_DIALECT,
        logging: false,
        define: {
          freezeTableName: true
        },
        timezone: '+07:00'
      })

    
    const myStore = new SequelizeStore({
        db: sequelize,
    });

    app.use(
      session({
          secret: "keyboard cat",
          store: myStore,
          saveUninitialized: false,
          resave: false, // we support the touch method so per the express-session docs this should be set to false
          proxy: true, // if you do SSL outside of node.
          expiration: 300 * 1000,
          cookie: {expires: 300 * 1000}
          
      })
    );
   
    myStore.sync();

    app.use(passport.authenticate('session'));

    // ma hoa chuyen dinh dang format
    passport.serializeUser(function(user, cb) {
      process.nextTick(function() {
        // cb(null, { id: user.id, username: user.username });
        cb(null, user);
      });
    });
    
    // giai ma hoa - doc thong tin format
    passport.deserializeUser(function(user, cb) {
      process.nextTick(function() {
        return cb(null, user);
      });
    });
}


export default configSession;