const { response, request } = require("express")
const Usuario = require("../models/usuario")
const bcryptjs = require("bcryptjs");


const getUsuarios = async(req= request, res = response)=>{
    const {unblock} = req.query;
    const usuario = await Usuario.find({estado:unblock})
    res.json({
        ok:true,
        usuario,
    })
}
const getUsuario = async(req= request, res = response)=>{
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    res.json({
        ok:true,
        usuario
    })
}
const postUsuario = async(req= request, res = response)=>{
    const {nombre,password, ...data} = req.body;
    data.nombre = nombre.toUpperCase();
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    
    const usuario = new Usuario(data);
    usuario.password = bcryptjs.hashSync(password, salt);
    await usuario.save();
    res.json({
        ok:true,
        usuario
    })
}
const putUsuario = async(req= request, res = response)=>{
    const {id} = req.params;
    const {password, ...data} = req.body;
    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }
    if(password){
        const salt = bcryptjs.genSaltSync();
        data.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, data, {new:true});
    res.json({
        ok:true,
        usuario
    })
}
const unBlockUsuario =async(req= request, res = response)=>{
    const {id} = req.params;
    const {unblock} = req.query;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: unblock}, {new:true})
    res.json({
        ok:true,
        usuario
    })
}
module.exports = {
    getUsuarios,
    getUsuario,
    postUsuario,
    putUsuario,
    unBlockUsuario,
}