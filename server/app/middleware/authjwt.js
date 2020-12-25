var jwt = require('jwt-simple')
var moment = require('moment');
//import axios from 'axios';



const User = require('../models/user');
const auth = {};

auth.verifyToken = async (req,res,next) =>{
    try{
        //const token = req.headers["Authorization"];     //Es necesario cambiar la cabecera de autenticación (Antes x-access-token)
        const token = req.headers["x-access-token"];
        console.log(token)
        if(!token) return res.status(403).json({message: "No token provided"})
    
    
        var secreto='123456'
        const decoded =  jwt.decode(token,secreto)
        console.log(decoded)
        const userFound = await User.findOne({email: decoded.login});
        if(!userFound) return res.json({message: "User not found"})
    
        next()
    
    }catch(error){
        return res.status(401).json({message: "No autorizado"})
    }
}

module.exports = auth 