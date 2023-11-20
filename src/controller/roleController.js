import roleApiService from "../service/roleApiService";


const readFunc = async (req, res) => {

    try {

        let data = await roleApiService.getAllRole();

        return res.status(200).json({
            message: data.message, //Error message
            errorCode: data.errorCode, // Error code
            roleList: data.roleList
        });

        

    } catch (error) {
        console.log("error: ", error)
        return res.status(500).json({
            message: "Error from server controller", //Error message
            errorCode: -1, // Error code
        })
    }

}

// create role
const createFunc = async (req, res) => {
    try {

        let data = await roleApiService.createNewRoles(req.body);
        return res.status(200).json({
            message: data.message, //Error message
            errorCode: data.errorCode, // Error code
        });

    } catch (error) {
        console.log("error: ", error)
        return res.status(500).json({
            message: "Error from server controller", //Error message
            errorCode: -1, // Error code
        })
    }
}

const updateFunc = async (req, res) => {
    console.log('userdata: ', req.body);

    try {
        let data = await userApiService.updateUserInfo(req.body);
        return res.status(200).json({
            message: data.message, //Error message
            errorCode: data.errorCode, // Error code
        });
        
    } catch (error) {
        console.log("error: ", error)
        return res.status(500).json({
            message: "Error from server controller", //Error message
            errorCode: -1, // Error code
        })
    }
}

const deleteFunc = async (req, res) => {
    try {

        if(req.query.id){

            let userId = req.query.id
            let data = await roleApiService.deleteRole(userId);
            return res.status(200).json({
                message: data.message, //Error message
                errorCode: data.errorCode, // Error code
            });
        }
      

    } catch (error) {
        console.log("error: ", error)
        return res.status(500).json({
            message: "Error from server controller", //Error message
            errorCode: -1, // Error code
        })
    }
}

const getRoleByGroup = async (req, res) => {

    try {

        if(req.params.groupId){

            let groupId = req.params.groupId
            let data = await roleApiService.getRoleByGroup(groupId);
            return res.status(200).json({
                message: data.message, //Error message
                errorCode: data.errorCode, // Error code
                roles: data.roles
            });
        }
      

    } catch (error) {
        console.log("error: ", error)
        return res.status(500).json({
            message: "Error from server controller", //Error message
            errorCode: -1, // Error code
        })
    }
}

const assignRoleToGroup = async (req, res) => {

    try {

        if(req.body.data){

            let data = await roleApiService.assignRoleToGroup(req.body.data);
            return res.status(200).json({
                message: data.message, //Error message
                errorCode: data.errorCode, // Error code
                roles: data.roles
            });
        }
      

    } catch (error) {
        console.log("error: ", error)
        return res.status(500).json({
            message: "Error from server controller", //Error message
            errorCode: -1, // Error code
        })
    }
}



module.exports = {readFunc, createFunc, updateFunc, deleteFunc, getRoleByGroup, assignRoleToGroup}