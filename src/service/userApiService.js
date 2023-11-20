
import bcrypt from "bcryptjs";
import db from "../models"
import JWTService from "../service/JWTService";
import JWTAction from "../middleware/JWTAction";
require("dotenv").config();


const bluebird = require('bluebird');


// To hash a password:
const hashPassword = (password) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

const checkEmailExist = async (userEmail) => {

    let user = await db.User.findOne({
        where: {email: userEmail}
    })

    if(user){
        console.log("user: ", user);
        return true;
    }

    return false;
}

const checkPhoneExist = async (userPhone) => {
    
    let user = await db.User.findOne({
        where: {phone: userPhone}
    })

    if(user){
        return true;
    }

    return false;

}


const createNewUser = async (userData) => {

    // check email/phone number are exist

    // let isEmailExist = await checkEmailExist(userData.email);
    // if(isEmailExist) {
    //     return {
    //         message: "Email is already exist", //Error message
    //         errorCode: 1, // Error code
    //     }
    // }

    // let isPhoneExist = await checkPhoneExist(userData.phone);
    // if(isPhoneExist) {
    //     return {
    //         message: "phone is already exist", //Error message
    //         errorCode: 1, // Error code
    //     };
    // }

    // hash user password
    let hashPass = hashPassword(userData.password);

    // create a new user
    try {
        await db.User.create({
            email: userData.email,
            username: userData.userName,
            phone: userData.phone,
            password: hashPass,
            address: userData.address,
            sex: userData.sex,
            groupId: 6
        });
        
        console.log('User created successfully:');

        return {
            message: "User created successfully", //Error message
            errorCode: 0, // Error code
        }
    } catch (error) {

        console.error('Error creating user:', error);
        return {
            message: "Error from server maybe database", //Error message
            errorCode: -2, // Error code
        }
    }


}


const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword); 
}


const handleUserLogin = async (userData) => {

    try {
        
        let user = await db.User.findOne({
            where: {
                email: userData.email
            },
            attributes: ['username', 'email', 'sex', 'password', 'groupId'] 
        });

        if (user) {

            const isPasswordValid = checkPassword(userData.password, user.password);

            if (isPasswordValid) {

                // let token = 

                let groupWithRoles = await JWTService.getGroupWithRoles(user);

                let payload = {
                    email: userData.email,
                    groupWithRoles,
                    username: user.username,
                    expiresIn: process.env.JWT_EXPIRESIN
                }

                let token = JWTAction.createJWT(payload)


                return { 
                    errorCode: 0, 
                    message: 'Login successful', 
                    data: {
                        access_token: token,
                        data: groupWithRoles,
                        email: user.email,
                        username: user.username
                    }
                };
            } else {
                return { 
                    errorCode: 1,  
                    message: 'Invalid password',
                    data: '' 
                };
            }
        } else {

            console.log("Not found user with email");
            
            return { 
                errorCode: 1, 
                message: 'User not found',
                data: ''
            };
        }
    } catch (error) {
        console.error('Error occurred during user login:', error);
        return { success: false, message: 'An error occurred during login' };
    }

   
}


const getAllUser = async () => {

    try {
        const userList = await db.User.findAll({
            attributes: ['id', 'username', 'email', 'sex', 'address', 'phone', 'groupId'], // Include only the desired fields, excluding 'password',
            include: {model: db.Group, attributes: ["name", "description"]}
        });
        if(userList) {
            return {
                message: "Get User successfully!!",
                errorCode: 0,
                userList: userList
            }; 
        }else {
            return {
                message: "Get User successfully!!",
                errorCode: 0,
                userList: []
            }; 
        }

    } catch (error) {
        console.log("Error when get user: ", error);
        return {
            message: "Error when get user!!",
            errorCode: 1,
            userList: []
        }; 
    }
    

}


const getAllUserWithPagination = async (page, limit) => {

    try {

        let offset = (page - 1) * limit;

        const {count, rows} = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ['id', 'username', 'email', 'sex', 'address', 'phone', 'groupId'], // Include only the desired fields, excluding 'password',
            include: {model: db.Group, attributes: ["name", "description", "id"]},
            order: [['id', 'DESC']]
        });

        let totalPages = Math.ceil(count/limit);

        let data = {
            totalRows: count,
            totalPage: totalPages,
            userList: rows
        }
        
        return {
            message: "Get User successfully!!",
            errorCode: 0,
            data: data
        }; 

    } catch (error) {
        console.log("Error when get user: ", error);
        return {
            message: "Error when get user!!",
            errorCode: 1,
            data: {}
        }; 
    }
    

}


const updateUserInfo  = async (userData) => {

    console.log('userdata: ', userData);
    
    try {
        // Find the user by ID
        const user = await db.User.findByPk(userData.userId);

        // If user not found
        if (!user) {
            return {
               message: "User not exit",
               errorCode: 2,
           }; 
        }else {

            // Update the user with new data
            user.username = userData.username;
            user.phone = userData.phone;
            user.address = userData.address;
            user.sex = userData.sex;
            user.groupId = userData.group;

            await user.save(); // Save the updated user to the database
            console.log('Update user successfully');
            
            return {
               message: "Update User successfully!!",
               errorCode: 0,
           }; 
        }
     
    } catch (error) {
        console.error('Error Update user by ID:', error);
        return {
            message: "Error when update user!!",
            errorCode: 1,
        }; 
    }

}

const deleteUser = async (id) => {
    
    try {
         // Find the user by ID
         const user = await db.User.findByPk(id);

         if (!user) {
             return {
                message: "User not exit",
                errorCode: 2,
            }; 
         }else {
             // Delete the user
             await user.destroy();
             console.log('User deleted successfully');
             return {
                message: "Delete User successfully!!",
                errorCode: 0,
            }; 
         }
 

    } catch (error) {

        console.log("Error when delete user: ", error);
        return {
            message: "Error when delete user!!",
            errorCode: 1,
        }; 
    }

}


module.exports = {
    createNewUser,
    handleUserLogin,
    getAllUser,
    deleteUser,
    getAllUserWithPagination,
    updateUserInfo
}