const db = require('../models/index');
const jwt = require('jsonwebtoken');

exports.signin = async function(req, res, next) {
    //finding a user
    
    try {
        let user = await db.User.findOne({
            email:req.body.email
        });
        let { id, username, profileImageUrl } = user;
        let isMatch = await user.comparePassword(req.body.password);
        
        if(isMatch) {
            let token = jwt.sign({
                id,
                username,
                profileImageUrl
            },
                process.env.SECRET_KEY
            );
            
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            });
        } else {
            return next({
                status:400,
                message: "Invalid Email/Password."
            });
        }
    } catch (e) {
        return next({
                status:400,
                message: "Invalid Email/Password."
            });
    }
    
}
    //Checking if ther password matches what was sent to the server
    //if it all matches
        //log them in
};


//signoup logic
exports.signup = async function(req, res, next) {
    try{
        //create a user
        let user=await db.User.create(req.body);
        let {id, username, profileImageUrl} = user; //deconstrocturing instead of user.id, user.username, ....
        
        // create a token (signing a token)
        let token = jwt.sign(
            { //sign function of the jwt module
                id, //this is the same as id:id
                username, //same as username: username ES2015
                profileImageUrl
            
            },
            process.env.SECRET_KEY  //the token will be created with process.env.SECRET_KEY, which has been created in opur .env folder
        );
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        });
     
       
    } catch(err) {
        //if error is 11000 respond with username/email already taken
        if(err.code ===11000){
            err.message = 'Sorry, that username and/or email is taken';
        }
        
        return next({
            status: 400,
            message: err.message
        })
        
        
    }
}