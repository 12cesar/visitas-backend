const { request, response } = require("express")
const Categoria = require('../models/categoria');


const getCategorias = async(req = request, res=response)=>{
    const {unblock} = req.query;
    const categoria = await Categoria.find({estado:unblock});
    res.json({
        ok:true,
        msg: 'Categorias mostradas con exito',
        categoria,
    })
}
const getCategoria = async(req = request, res=response)=>{
    const {id}= req.params;
    const categoria = await Categoria.findById(id);
    res.json({
        ok:true,
        msg: 'Categoria mostradas con exito',
        categoria
    })
}
const postCategoria = async(req = request, res=response)=>{
    const {descripcion, ...data} = req.body;
    data.descripcion = descripcion.toUpperCase();
    const categoria = new Categoria(data);
    await categoria.save();
    res.json({
        ok:true,
        msg: 'Categoria creada con exito',
        categoria
    })
}
const putCategoria = async(req = request, res=response)=>{
    const {id}= req.params;
    const data= req.body;
    if (data.descripcion) {
        data.descripcion = data.descripcion.toUpperCase();
    }
    const categoria = await Categoria.findByIdAndUpdate(id, data, {new:true});
    res.json({
        ok:true,
        msg: 'Categoria editada con exito',
        categoria
    })
}
const unblockCategoria = async(req = request, res=response)=>{
    const {id} = req.params;
    const {unblock} = req.query;
    const categoria = await Categoria.findByIdAndUpdate(id, {estado:unblock}, {new:true})
    res.json({
        ok:true,
        msg: categoria.estado ? 'Categoria desbloqueada con exito' : 'Categoria bloqueada con exito',
        categoria
    })
}

module.exports = {
    getCategorias,
    getCategoria,
    postCategoria,
    putCategoria,
    unblockCategoria
}