import userApiService from "../service/userApiService";


const readFunc = async (req, res) => {

    try {

        // console.log('req: ', req.user);


        if(req.query.page && req.query.limit){
            let page = req.query.page;
            let limit = req.query.limit;

            // console.log(">>> check data: ", "page = ", page, "limit = ", limit);

            let data = await userApiService.getAllUserWithPagination(+page, +limit);

            return res.status(200).json({
                message: data.message, //Error message
                errorCode: data.errorCode, // Error code
                data: data.data
            });

        }else{
           
            return res.status(500).json({
                message: "Missing parameter", //Error message
                errorCode: -1, // Error code
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

const createFunc = async (req, res) => {

    try {

        let data = await userApiService.createNewUser(req.body);
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
            let data = await userApiService.deleteUser(userId);
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

const getUserAccount = async (req, res) => {
    return res.status(200).json({
        message: 'ok', //Error message
        errorCode: 0, // Error code
        data: {
            access_token: req.token,
            email: req.user.email,
            groupWithRoles: req.user.groupWithRoles,
            username: req.user.username,
        }
    });
}


module.exports = {readFunc, createFunc, updateFunc, deleteFunc, getUserAccount}