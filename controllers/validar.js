const { request, response } = require("express");
const Cliente = require('../models/cliente');
const bcryptjs = require("bcryptjs");
const generarToken = require("../helpers/generar-jwt");

const getValidarDni = async(req=request, res=response) => {
    const {dni} = req.params;
    const cliente = await Cliente.findOne({dni})
    if (!cliente) {
        return res.json({
            ok:false,
            msg:'DNI no registrado, porfavor registrese',
            cliente:null
        })
    }
    if (!cliente.estado) {
        const cambio = await Cliente.findOneAndUpdate({dni},{estado:true},{new:true})
        return res.json({
            ok:true,
            msg:'DNI desbloqueado',
            cliente:cambio
        })
    }
    res.json({
        ok:true,
        msg:'DNI registrado',
        cliente
    })
}
const putResetPassword = async(req=request, res=response) => {
    const {dni, password} = req.body;
    const salt = bcryptjs.genSaltSync();
    const password2 = bcryptjs.hashSync(password,salt);
    const cliente = await Cliente.findOneAndUpdate({dni}, {password:password2}, {new:true})
    const token = await generarToken.generarJWTContribuyentes(cliente._id);
    res.json({
        ok:true,
        msg:'Password editado con exito',
        cliente,
        token
    })
}
module.exports ={
    getValidarDni,
    putResetPassword
}