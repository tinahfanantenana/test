const jwt= require('jsonwebtoken');

/**
 * 
 * @param {object} userData 
 * @returns {string}
 */
generateToken= (userData)=>{
        return jwt.sign(
            {userId:userData.id,isAdmin:userData.isAdmin},
            process.env.SECRET_KEY,
            {
                expiresIn: '7d'
            }
        )
    }
 module.exports=generateToken;