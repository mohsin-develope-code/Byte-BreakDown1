const jwt = require('jsonwebtoken');
require('dotenv').config()

const SECRET_KEY = process.env.secret_key

const setUser = (user) => {
      
    payload = {
        id: user._id,
        email: user.email,
    }

    const token = jwt.sign(payload,SECRET_KEY)

    return token;
}




const getUser = (token) => {
    
    return jwt.verify(token, SECRET_KEY);
}



module.exports = {
    setUser, 
    getUser,
}