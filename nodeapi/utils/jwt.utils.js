const jwt= require('jsonwebtoken');

/**
 * 
 * @param {object} userData 
 * @returns {string}
 */
module.generateToken= (userData)=>{
        return jwt.sign(
            {userId:userData.id,isAdmin:userData.isAdmin},
            process.SECRET_KEY,
            {
                expiresIn: '7d'
            }
        )
    }
