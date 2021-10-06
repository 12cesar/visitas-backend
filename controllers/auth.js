const { request, response } = require("express")
const Usuario = require('../models/usuario');
const bcryptjs = require("bcryptjs");
const generarToken = require('../helpers/generar-jwt');

const postLogin = async(req = request, res=response)=>{
    const {usuario, password} = req.body;
    const user = await Usuario.findOne({usuario});
    if (!user) {
        return res.json({
            ok:false,
            msg:'Usuario no existe, converse con el administrador'
        })
    }
    const validarPassword = bcryptjs.compareSync(password, user.password)
    if (!validarPassword) {
        return res.json({
            ok:false,
            msg:'Contraseña de no valida'
        })
        
    }
    const token = await generarToken.generarJWT(user._id);
    res.json({
        ok:true,
        user,
        token
    })
}

module.exports = {
    postLogin
}