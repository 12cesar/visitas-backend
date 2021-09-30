const { request, response } = require("express")
const Anuncio = require('../models/anuncio');

const getAnuncios = async(req =request, res=response)=>{
    const {unblock} = req.query;
    const anuncio = await Anuncio.find({estado:unblock})
                                    .populate('usuario', 'nombre');
    res.json({
        ok:true,
        msg:'Anuncios ',
        anuncio
    })
}

const getAnuncio = async(req =request, res=response)=>{
    const {id} = req.params;
    const anuncio = await Anuncio.findById(id)
                                    .populate('usuario', 'nombre');
    res.json({
        ok:true,
        anuncio
    })
}

const postAnuncio = async(req =request, res=response)=>{
    const {usuario, ...data} = req.body;
    const user = req.usuarioToken;

    const anuncio = new Anuncio(data);
    anuncio.usuario = user._id;
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
        anuncio
    })
}

const unblockAnuncio = async(req =request, res=response)=>{
    const {unblock} = req.query;
    const {id} = req.params;
    const anuncio = await Anuncio.findByIdAndUpdate(id, {estado:unblock}, {new:true});
    res.json({
        ok:true
    })
}

module.exports = {
    getAnuncios, 
    getAnuncio,
    postAnuncio,
    putAnuncio,
    unblockAnuncio
}