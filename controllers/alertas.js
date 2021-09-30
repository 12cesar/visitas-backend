const { request, response } = require("express")
const Alerta = require('../models/alerta');

const getAlertas = async(req =request, res=response)=>{
    const {unblock} = req.query;
    const alerta = await Alerta.find({estado:unblock})
                                .populate('usuario', 'nombre')
    res.json({
        ok:true,
        msg:'Alertas mostrado con exito',
        alerta
    })
}
const getAlerta = async(req =request, res=response)=>{
    const {id} = req.params;
    const alerta = await Alerta.findById(id)
                                .populate('usuario', 'nombre')
    res.json({
        ok:true,
        msg:'Alerta mostrado con exito',
        alerta
    })
}
const postAlerta = async(req =request, res=response)=>{
    const {usuario,...data} = req.body;
    const user = req.usuarioToken;
    const alerta = new Alerta(data);
    alerta.usuario = user._id;
    await alerta.save();
    res.json({
        ok:true,
        msg:'Alerta creado con exito',
        alerta
    })
}
const putAlerta = async(req =request, res=response)=>{
    const {id} = req.params;
    const {usuario, ...data} = req.body;
    const user = req.usuarioToken;
    data.usuario = user._id;
    const alerta = await Alerta.findByIdAndUpdate(id, data, {new:true})
    res.json({
        ok:true,
        msg:'Alerta editado con exito',
        alerta
    })
}
const unblockAlerta = async(req =request, res=response)=>{
    const {id} = req.params;
    const {unblock} = req.query;
    const alerta = await Alerta.findByIdAndUpdate(id, {estado:unblock}, {new:true})
    res.json({
        ok:true,
        msg: alerta.estado ? 'Alerta desbloqueado con exito' : 'Alerta bloqueado con exito', 
        alerta
    })
}

module.exports = {
    getAlertas,
    getAlerta,
    postAlerta,
    putAlerta,
    unblockAlerta
}