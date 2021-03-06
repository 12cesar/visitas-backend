const { request, response } = require("express")
const Anuncio = require('../models/anuncio');

const getAnuncios = async(req =request, res=response)=>{
    const {unblock} = req.query;
    const anuncio = await Anuncio.find({estado:unblock})
                                    .sort({fecha:-1})
                                    .populate('usuario', 'nombre');
    res.json({
        ok:true,
        msg:'Anuncios mostrado con exito',
        anuncio
    })
}

const getAnuncio = async(req =request, res=response)=>{
    const {id} = req.params;
    const anuncio = await Anuncio.findById(id)
                                    .populate('usuario', 'nombre');
    res.json({
        ok:true,
        msg:'Anuncio mostrado con exito',
        anuncio
    })
}

const postAnuncio = async(req =request, res=response)=>{
    const {usuario, ...data} = req.body;
    const user = req.usuarioToken;
    const date = new Date();
    const mes = String(date.getMonth());
    const dia = String(new Date().getDate());
    const fecha = `${(dia.length===1 ? `0${dia}`: dia)}-${(mes.length===1 ? `${Number(mes)+1}`: Number(mes)+1)}-${date.getFullYear()}`;
    const anuncio = new Anuncio(data);
    anuncio.usuario = user._id;
    anuncio.fecha = fecha;
    await anuncio.save();
    res.json({
        ok:true,
        msg:'Anuncio creado con exito',
        anuncio
    })
}

const putAnuncio = async(req =request, res=response)=>{
    const {id} = req.params;
    const {usuario,...data} = req.body;
    const user = req.usuarioToken;
    data.usuario = user._id;
    const anuncio = await Anuncio.findByIdAndUpdate(id, data, {new:true});
    res.json({
        ok:true,
        msg:'Anuncio editado con exito',
        anuncio
    })
}

const unblockAnuncio = async(req =request, res=response)=>{
    const {unblock} = req.query;
    const {id} = req.params;
    const anuncio = await Anuncio.findByIdAndUpdate(id, {estado:unblock}, {new:true});
    res.json({
        ok:true,
        msg: anuncio.estado ? 'Anuncio dessbloqueado con exito' : 'Anuncio bloqueado con exito',
        anuncio

    })
}

module.exports = {
    getAnuncios, 
    getAnuncio,
    postAnuncio,
    putAnuncio,
    unblockAnuncio
}