import userApiService from "../service/userApiService";


const handleRegister = async (req, res) => {

    try {

        let { email, phone, userName, password } = req.body;

        if (!email || !phone || !userName || !password) {
            return res.status(200).json({
                message: "Missing required parameters", //Error message
                errorCode: 1, // Error code
            });
        }


        // createUser
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

const handleLogin = async (req, res) => {

    try {

        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(200).json({
                message: "Missing required parameters", //Error message
                errorCode: 1, // Error code
            });
        }

        let data = await userApiService.handleUserLogin(req.body);

        if(data.errorCode == 0){
            let cookie = data.data.access_token;   
            res.cookie('jwt', cookie, {httpOnly: true});
        }

        return res.status(200).json({
            message: data.message, //Error message
            errorCode: data.errorCode, // Error code
            data: data.data
        });

    } catch (error) {
        console.log("error: ", error)
        return res.status(500).json({
            message: "Error from server controller", //Error message
            errorCode: -1, // Error code
        })
    }

}

const handleLogout = async (req, res) => {

    try {

        res.clearCookie("jwt");

        return res.status(200).json({
            message: 'clear cookies done!', //Error message
            errorCode: 0, // Error code
            data: ''
        });

    } catch (error) {
        console.log("error: ", error)
        return res.status(500).json({
            message: "Error from server controller", //Error message
            errorCode: -1, // Error code
        })
    }

}



module.exports = {
    handleRegister,
    handleLogin,
    handleLogout
}