const jwt = require('jsonwebtoken');

const secret_key = "Mohsin$123";



const setUser = (user) => {
      
    payload = {
        id: user._id,
        email: user.email,
    }

    const token = jwt.sign(payload, secret_key)

    return token;
}




const getUser = (token) => {
    
    return jwt.verify(token, secret_key);
}



module.exports = {
    setUser, 
    getUser,
}