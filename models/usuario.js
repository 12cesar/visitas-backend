const { Schema, model } = require("mongoose");


const UsuarioSchema = new Schema({
    nombre:{
        type: String,
        required:[true, 'El nombre es obligatorio']
    },
    usuario:{
        type: String,
    },
    password:{
        type: String,
    },
    img:{
        type: String,
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        enum: ['ADMIN_ROLE', 'CHOFER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
});


UsuarioSchema.methods.toJSON = function(){
    const {__v, password, ...usuario}= this.toObject();
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);
