const models=require('../models');

function serviceLogin(){

}

function serviceRegister(data){
    const isExistingUser= models.User.findOne()
}

module.exports={serviceLogin,serviceRegister}