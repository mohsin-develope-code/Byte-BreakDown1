const { getUser } = require('../Utils/jwt')


const checkAuth = (req, res, next) => {
    const token = req.cookies?.token;
    
    if(!token){
        return res.status(401)
                  .json({ message: "Unauthorized User", 
                          status: false});
    }


    const checkToken = getUser(token)
    if(!checkToken){
        return res.status(401)
                  .json({ message: "Unauthorized User", 
                          status: false});
    }



    req.user = checkToken;

    next();
}





module.exports = checkAuth;