const bcrypt= require("bcrypt");
const {User} = require('../models/user');
const generateToken = require ('../utils/jwt.utils');

async function register(data){
    const {name, username, password, email}= data;
    const findMail= User.findOne({
        where:{email}
    });

    if (findMail){
        throw new Error(`l'email existe déjà`);
    }

    const hashPassword= await bcrypt.hash(password,5);

    const user= User.create({
        email,
        password:hashPassword,
        username,
        name
    })

    return user;
}

async function login(data){
    const {email,password}=data;

    const user= User.findOne({
        where: {email}
    })

    if(!user){
        throw new Error(`l'utilisateur n'existe pas`);
    }

    const matchMdp= await bcrypt.compare(password,user.password);

    if (!matchMdp){
        throw new Error('Identifiant invalide');
    }

    const token=generateToken()
}

module.exports={
    register,
    login
}