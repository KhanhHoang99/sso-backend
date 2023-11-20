import express from "express";
import homeController from "../controller/homeController";
import loginController from "../controller/loginController";
import passport from 'passport';


const router = express.Router();

/**
 * 
 * @param {*} app : express app
 */
const initWebRoutes = (app) => {

    router.get('/login', loginController.getLoginPage)
    
    router.get('/', (req, res) => {
        res.send('Hello World');
    })

    router.get('/about', (req, res) => {
        res.send('Hello about');
    })

    router.get('/user', homeController.handleUserPage)

    router.post('/users/create-user', homeController.handleCreateNewUser)
    router.post('/delete-user/:id', homeController.deleteUser)
    router.post('/update-user/:id', homeController.getUpdateUserPage)
    router.post('/users/update-user', homeController.handleUpdateUser)

    router.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
      }));


    return app.use("/", router);

}

export default initWebRoutes