const { request, response } = require("express")
const Conduccion = require('../models/conduccion');

const getConducciones = async(req=request, res=response)=>{
    const conduccion = await Conduccion.find()
                                        .populate('chofer', 'nombre')
                                        .populate('vehiculo')
    res.json({
        ok:true,
        msg:'Conducciones mostrada con exito',
        conduccion
    })
}
const getConduccion = async(req=request, res=response)=>{
    const {id} =req.params;
    const conduccion = await Conduccion.findById(id);
    res.json({
        ok:true,
        msg:'Conduccion mostrado con exito',
        conduccion
    })
}
const postConduccion = async(req=request, res=response)=>{
    const data = req.body;
    const conduccion = new Conduccion(data);
    await conduccion.save();
    res.json({
        ok:true,
        msg:'Relacion creada con exito',
        conduccion
    })
}
const putConduccion = async(req=request, res=response)=>{
    const {id} = req.params;
    const data = req.body;
    const conduccion = await Conduccion.findById(id, data, {new:true})
    res.json({
        ok:true,
        msg:'Relacion editada con exito',
        conduccion
    })
}
const unblockConduccion = async(req=request, res=response)=>{
    const {id} =req.params;
    const conduccion = await Conduccion.findByIdAndRemove(id);
    res.json({
        ok:true,
        msg:'Relacion eliminada con exito',
        conduccion:null
    })
}

module.exports ={
    getConducciones,
    getConduccion,
    postConduccion,
    putConduccion,
    unblockConduccion
}