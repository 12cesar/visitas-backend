const { request, response } = require("express")
const Mensaje = require('../models/mensaje');

const getMensajes= async(req=request, res= response)=>{
    const {unblock} = req.query;
    const mensaje = await Mensaje.find({estado:unblock})
                                    .populate('usuario', 'nombre');
    res.json({
        ok:true,
        msg:'Mensajes mostrado con exito',
        mensaje
    })
}
const getMensaje= async(req=request, res= response)=>{
    const {id} = req.params;
    const mensaje = await Mensaje.findById(id)
                                    .populate('usuario', 'nombre');
    res.json({
        ok:true,
        msg:'Mensaje mostrado con exito',
        mensaje
    })
}

const postMensaje= async(req=request, res= response)=>{
    const {titulo,...data} = req.body;
    const date = new Date();
    const user = req.usuarioToken;
    const mes = String(date.getMonth());
    const dia = String(date.getDay())
    const fecha = `${(dia.length===1 ? `0${dia}`: dia)}-${(mes.length===1 ? `0${mes}`: mes)}-${date.getFullYear()}`;
    data.titulo = titulo.toUpperCase();
    data.fecha = fecha;
    data.usuario = user._id;
    const mensaje = new Mensaje(data);
    await mensaje.save();
    res.json({
        ok:true,
        msg:'Mensaje creado con exito',
        mensaje
    })
}

const putMensaje= async(req=request, res= response)=>{
    const {id} = req.params;
    const {titulo, ...data} = req.body;
    data.titulo =titulo.toUpperCase();
    const mensaje = await Mensaje.findByIdAndUpdate(id, data, {new:true})
    res.json({
        ok:true,
        msg:'Mensaje editado con exito',
        mensaje
    })
}

const unblockMensaje= async(req=request, res= response)=>{
    const {unblock} = req.query;
    const{id} =req.params;

    const mensaje = await Mensaje.findByIdAndUpdate(id, {estado:unblock}, {new:true})

    res.json({
        ok:true,
        msg: mensaje.estado ? 'Mensaje desbloqueado con exito' : 'Mensaje bloqueado con exito',
        mensaje
    })
}




module.exports={
    getMensajes,
    getMensaje,
    postMensaje,
    putMensaje,
    unblockMensaje
}