const joi = require('joi');


const  signupValidation = (req, res, next) => {

       const schema = joi.object({
             name: joi.string().min(3).max(30).required(),
             email: joi.string().email().required(),
             password: joi.string().min(6).max(50).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),    
        })


        const {error} = schema.validate(req.body)
        
        if(error){
          return res.status(400)
                    .json({message: "Validate your fields",
                           status: false,
                    })
        }


        next()
}





const  loginValidation = (req, res, next) => {

    const schema = joi.object({
          email: joi.string().email().required(),
          password: joi.string().min(6).max(50).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),    
     })


     const {error} = schema.validate(req.body)
     if(error){
       return res.status(400)
                 .json({message: "Validate your fields",
                        status: false,
                 })
     }


     next()
}



module.exports = {
    signupValidation,
    loginValidation
}