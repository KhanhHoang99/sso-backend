import express from "express";
import homeController from "../controller/homeController";

const router = express.Router();

/**
 * 
 * @param {*} app : express app
 */
const initWebRoutes = (app) => {
    
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


    return app.use("/", router);

}

export default initWebRoutes