
import groupService from "../service/groupService"


const readFunc = async (req, res) => {

    try {

        let data = await groupService.getGroups();
        
        return res.status(200).json({
            message: data.message, //Error message
            errorCode: data.errorCode, // Error code
            data: data.data
        })
        
    } catch (error) {
        
        console.log('error: ', error);
    }
}



module.exports = {
    readFunc
}