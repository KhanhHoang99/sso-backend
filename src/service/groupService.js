import db from "../models"

const getGroups = async () => {

    try {

        let data = await db.Group.findAll({
            order: [['name', 'DESC']]
        });

        return {
            message: "Get group success", //Error message
            errorCode: 0, // Error code
            data: data
        }
        
    } catch (error) {
        console.log('error: ', error);
        return {
            message: "Error from service", //Error message
            errorCode: 1, // Error code
            data: []
        }
    }
}

module.exports = {
    getGroups
}