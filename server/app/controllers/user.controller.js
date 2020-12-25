const UserCtrl = {};
const proveedor = require('../models/proveedor');
const User = require('../models/user');

UserCtrl.getUsuarios = async (req,res) => {
    const usuarios = await User.find()
    res.json(usuarios);
}

UserCtrl.getUsuario = async (req,res) => {
    const usuario = await User.findById(req.params.id);
    res.json(usuario);
}

module.exports = UserCtrl;