import userService from "../service/userService";



const handleUserPage = async (req, res) => {

    let userList = await userService.getUserList();
    res.render('user', {userList});
};

const handleCreateNewUser = async (req, res) => {

    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    await userService.createNewUser(email, username, password);
    return res.redirect('/user');
    
};

const deleteUser = async (req, res) => {

    let id = req.params.id;
    await userService.deleteUser(id);
    return res.redirect('/user');
    
};

const getUpdateUserPage = async (req, res) => {

    let id = req.params.id;
    let user = await userService.getUserById(id);
    res.render('updateUser', {user});
    
};

const handleUpdateUser = async (req, res) => {

    let userId = req.query.id;
    let email = req.body.email;
    let username = req.body.username;

    userService.updateUserInfo(userId, email, username);
    return res.redirect('/user');
    
};

module.exports = {
    handleUserPage,
    handleCreateNewUser,
    deleteUser,
    getUpdateUserPage,
    handleUpdateUser
    
}