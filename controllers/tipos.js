const { request, response } = require("express")
const Tipo = require('../models/tipo');
const Categoria = require('../models/categoria');
const getTipos = async(req=request, res=response)=>{
    const tipo = await Tipo.find()
                            .populate('categoria','descripcion')
    res.json({
        ok:true,
        msg:'tipos mostrado con exito',
        tipo
    })
}
const getTipo = async(req=request, res=response)=>{
    const {id} = req.params;
    const tipo = await Tipo.findById(id)
                            .populate('categoria', 'descripcion');
    res.json({
        ok:true,
        msg:'tipo mostrado con exito',
        tipo
    })
}
const postTipo = async(req=request, res=response)=>{
    const {descripcion, categoria, ...data} = req.body;
    data.descripcion = descripcion.toUpperCase();
    const cat = await Categoria.findOne({_id:categoria});
    if (!cat.estado) {
        return res.json({
            ok:false,
            msg:'La categoria esta bloqueada, converse con el administrador',
            tipo: null
        })
    }
    data.categoria = categoria;
    const tipo = new Tipo(data);
    await tipo.save(); 
    res.json({
        ok:true,
        msg:'tipo ha sido creado con exito',
        tipo,

    })
}
const putTipo = async(req=request, res=response)=>{
    const {id} = req.params;
    const {descripcion, categoria, ...data} = req.body;
    data.descripcion = descripcion.toUpperCase();
    const cat = await Categoria.findOne({_id:categoria});
    if (!cat.estado) {
        return res.json({
            ok:false,
            msg:'La categoria esta bloqueada, converse con el administrador',
            tipo: null
        })
    }
    data.categoria = categoria;
    const tipo = await Tipo.findByIdAndUpdate(id, data, {new:true})
    res.json({
        ok:true,
        msg:'Tipo ha sido editado con exito',
        tipo
    })
}
const unblockTipo = async(req=request, res=response)=>{
    const {id}= req.params;
    const {unblock} = req.query;
    const tipo = await Tipo.findByIdAndUpdate(id, {estado:unblock}, {new:true});
    
    res.json({
        ok:true,
        msg: tipo.estado ? 'Tipo desbloqueado con exito' : 'Tipo bloqueado con exito',
        tipo
    })
}


module.exports = {
    getTipos,
    getTipo,
    postTipo,
    putTipo,
    unblockTipo
}