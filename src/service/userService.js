import mysql from 'mysql2/promise';
import bcrypt from "bcryptjs";
import db from "../models"

const bluebird = require('bluebird');

// To hash a password:
const hashPassword = (password) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}


// Load hash from your password DB.
// bcrypt.compareSync(password, hashPassword); // true


const createNewUser = async (email, userName, password) => {
    
    let hashPass = hashPassword(password);

    try {
        // Create a new user
        const newUser = await db.User.create({
            email: email,
            username: userName,
            password: hashPass,
        });
        console.log('User created successfully:');
    } catch (error) {
        console.error('Error creating user:', error);
    }

}

const getUserList = async () => {

    try {
        // Fetch all users from the database
        const userList = await db.User.findAll();
        return userList; 
    } catch (error) {
        console.log("Error when get user: ", error);
        throw error;
    }
    

}

const deleteUser = async (id) => {
    
    try {
         // Find the user by ID
         const user = await db.User.findByPk(id);

         // If user not found, handle the scenario (throw an error or return a message)
         if (!user) {
             throw new Error('User not found');
         }
 
         // Delete the user
         await user.destroy();
         console.log('User deleted successfully');

    } catch (error) {
        console.log("Error when delete user: ", error);
    }

}

const getUserById = async (id) => {
    
    try {

        // Find the user by ID
        const user = await db.User.findByPk(id);

        // If user not found, handle the scenario (throw an error or return a message)
        if (!user) {
            throw new Error('User not found');
        }

        // Return the user object
        return user;
        
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error; // Throw the error to be handled by the caller
    }
    
}

const updateUserInfo  = async (userId, newEmail, newUsername) => {
    
    
    try {
        // Find the user by ID
        const user = await db.User.findByPk(userId);

        // If user not found
        if (!user) {
            throw new Error('User not found');
        }

        // Update the user with new data
        user.email = newEmail;
        user.username = newUsername;
        await user.save(); // Save the updated user to the database

        console.log('Update user success!')
        
    } catch (error) {
        console.error('Error updating user by ID:', error);
        throw error; // Throw the error to be handled by the caller
    }

}


module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
    updateUserInfo ,
    getUserById
}