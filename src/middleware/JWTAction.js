import jwt from 'jsonwebtoken';

require("dotenv").config();

const secretKey =  process.env.JWT_SECRET; 

const nonSecurePaths = ['/login', '/register', '/logout'];


const createJWT = (payload) => {

    let token = null;

    try {
        token = jwt.sign(payload, secretKey, {expiresIn: process.env.JWT_EXPIRESIN});
    } catch (error) {
        console.log('error create token: ', error)
    }
    
    return token;
}

const verifyToken = (token) => {

    let data = null;

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          console.error('Token verification failed:', err.message);
        } else {
          // Token is valid, decoded contains the decoded payload
        //   console.log('Decoded token payload:', decoded);
          data = decoded;
        }
    });

    return data;
}

const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } 
    return null;
}

const checkUserJWT = (req, res, next) => {
    
    if(nonSecurePaths.includes(req.path)){
        return next();
    }

    let cookies = req.cookies;
    const tokenFromHeader = extractToken(req);

    if((cookies && cookies.jwt) || tokenFromHeader){

        let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader;
        let decoded = verifyToken(token);

        if(decoded) {
            req.user = decoded;
            req.token = token;
            next();
        }else{
            return res.status(401).json({
                message: "Not authenticated the user", //Error message
                errorCode: -1, // Error code
            });
        }
    }
    else{
        console.log('khong co cookies ')
        return res.status(401).json({
            message: "Not authenticated the user", //Error message
            errorCode: -1, // Error code
        });
    }
}

const checkUserPermission = (req, res, next) => {

    if(nonSecurePaths.includes(req.path) || req.path === '/account'){
        return next();
    }

    if(req.user) {

        let roles = req.user.groupWithRoles.Roles;
        let email = req.user.email;
        let currentUrl = req.path
        
        if(!roles || roles.length === 0) {
            return res.status(403).json({
                message: "you don't permission to access this resource", //Error message
                errorCode: -1, // Error code
            });
        }

        let canAccess = roles.some(item => item.url === currentUrl || currentUrl.includes(item.url))
       
        if(canAccess) {
            next();
        }else{
            return res.status(403).json({
                message: "you don't permission to access this resource", //Error message
                errorCode: -1, // Error code
            });
        }
    }
}



module.exports = {
    createJWT,
    verifyToken,
    checkUserJWT,
    checkUserPermission
}