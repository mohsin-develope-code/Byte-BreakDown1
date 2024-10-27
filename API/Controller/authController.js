const User_Model = require('../Model/User');
const bcrypt = require('bcryptjs');
const { setUser } = require('../Utils/jwt');



async function handleUserSignup (req, res) {

    try {

        const {name, email, password} = req.body;

        const checkUser = await User_Model.findOne({email});
        if(checkUser){
            return res.status(409)
                      .json({message: "User Already Exist",
                             status: false,
            })
        }


        const user = new User_Model({name, email, password});
        user.password = await bcrypt.hash(password, 10);
        await user.save();


        res.status(201)
           .json({message: "Signup Successfully",
                  status: true,
         })

        
    } catch (error) {

        res.status(500)
           .json({message: "Internal Server Error",
                  status: false,
        })
        
    }

}




async function handleUserLogin (req, res) {


    try {
        
        const {email, password} = req.body;

        const checkUser = await User_Model.findOne({email});
        if(!checkUser){
            return res.status(404)
                   .json({ message: "Invalid User Details", 
                           status: false});
        }


        const isPassEqual = await bcrypt.compare(password, checkUser.password);
        if(!isPassEqual){
            return res.status(400)
                      .json({ message: "Incorrect Password", 
                              status: false});
        }




        const jwtToken = setUser(checkUser);
        res.cookie('token', jwtToken, { 
            httpOnly: true, 
            secure: true, 
            sameSite: 'None', 
            path: '/' }
        );





        res.status(200)
           .json({message: "Login Successful",
                  status: true,
                  token: jwtToken,
                  user: checkUser.name})




    } catch (error) {

        res.status(500)
           .json({message: "Internal Server Error",
                  status: false,
                })
        
    }

}





function handleUserLogout  (req, res) {
    
    res.cookie("token", "");

    res.status(200)
       .json({message: "Logout Successful",
              status: true});

} 





module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleUserLogout,
}