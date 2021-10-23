const { request, response } = require("express")
const Vehiculo = require('../models/vehiculo')


const getVehiculos = async(req=request, res=response)=>{
    const {unblock} = req.query;
    const vehiculo = await Vehiculo.find({estado:unblock})
                                    .populate('usuario', 'nombre');
    res.json({
        ok:true,
        msg:'Vehiculos mostrado con exito',
        vehiculo
    })
}
const getVehiculo = async(req=request, res=response)=>{
    const {id} = req.params;
    const vehiculo = await Vehiculo.findById(id)
                                    .populate('usuario', 'nombre')
    res.json({
        ok:true,
        msg:'Vehiculo mostrado con exito',
        vehiculo
    })
}
const postVehiculo = async(req=request, res=response)=>{
    const data = req.body;
    const user = req.usuarioToken;
    const vehiculo = new Vehiculo(data);
    vehiculo.usuario = user._id;
    await vehiculo.save();
    res.json({
        ok:true,
        msg:'Vehiculo registrado con exito',
        vehiculo
    })
}
const putVehiculo = async(req=request, res=response)=>{
    const {id} = req.params;
    const data = req.body;
    data.usuario = req.usuarioToken._id;
    const vehiculo = await Vehiculo.findByIdAndUpdate(id, data, {new:true});
    res.json({
        ok:true,
        msg:'Vehiculo editado con exito',
        vehiculo
    })
}
const unblockVehiculo = async(req=request, res=response)=>{
    const {id} = req.params;
    const {unblock} = req.query;
    const vehiculo = await Vehiculo.findByIdAndUpdate(id, {estado:unblock}, {new:true})
    res.json({
        ok:true,
        msg: vehiculo.estado ? 'Vehiculo desbloqueado con exito' : 'Vehiculo bloqueado con exito',
        vehiculo
    })
}

module.exports = {
    getVehiculos,
    getVehiculo,
    postVehiculo,
    putVehiculo,
    unblockVehiculo
}