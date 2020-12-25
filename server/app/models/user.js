const  bcrypt = require ('bcryptjs');
const mongoose = require('mongoose');

const {Schema} = mongoose;

const UserSchema = new Schema({
    email: { type: String , unique: true, lowercase:true},
    password: { type: String, } //Añadimos select false si no queremos que se muestre la contraseña en los getters
})

UserSchema.statics.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password,salt)
}

UserSchema.statics.comparePassword = async (password, receivedPassword) =>{
    return await bcrypt.compare(password,receivedPassword)
}

module.exports = mongoose.model ('user', UserSchema)