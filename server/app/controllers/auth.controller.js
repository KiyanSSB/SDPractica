const authCtrl = {};
const User = require('../models/user');

var jwt = require('jwt-simple');
const moment = require('moment');

//DARNOS DE ALTA EN LA BASE DE DATOS
authCtrl.signUp = async (req,res) =>{
    const {email,password} = req.body;


    const userFound = await User.findOne({email: req.body.email});
    //Si ya ha está registrado el usuario 
    if(userFound)  return res.status(400).json({message: "User already in database"})
    
    const nuevoUsuario= new User({
        email,
        password: await User.encryptPassword(password)    
    })
    

    console.log(nuevoUsuario)
    const savedUser = await nuevoUsuario.save();

    res.json({message: "Usuario registrado correctamente"})
}

//LOGIN, NOS DEVUELVE EL TOKEN DEL USUARIO 
authCtrl.signIn = async (req,res) =>{

    console.log(req);
    const userFound = await User.findOne({email: req.body.email});
    if(!userFound)
        return res.status(400).json({message: "User not found"})

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)
        
    if(!matchPassword) return res.status(401).json({message: "Invalid password"})

    var payload = {
        login : req.body.email,
        exp: moment().add(7, 'days').valueOf()
    }

    var secreto='123456'
    var token = jwt.encode(payload,secreto)

    res.json(token)

}

module.exports = authCtrl