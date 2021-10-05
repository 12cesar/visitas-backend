const { request, response } = require("express")
const { obtenerDni } = require("../helpers")
const Cliente = require('../models/cliente');

const getClientes = async(req=request, res=response)=>{
    const {unblock} = req.query;
    const cliente = await Cliente.find({estado:unblock});
    res.json({
        ok:true,
        cliente
    })
}
const getCliente = async(req=request, res=response)=>{
    const {id} = req.params;
    const cliente = await Cliente.findById(id);
    res.json({
        ok:true,
        cliente
    })
}
const postCliente = async(req=request, res=response)=>{
    const {dni, nombre, ...data} = req.body;
    const resp = await obtenerDni(dni);
    if (!resp.success && resp.msg !== 'Datos de menor de edad no disponibles en tu plan') {
        res.json({
            ok:false,
            msg: resp.msg
        })
    }
    if(!resp.success && resp.msg === 'Datos de menor de edad no disponibles en tu plan'){
        data.nombre = nombre.toUpperCase();
        data.tipo = 'menor';
        
    }
    if(resp.success) {
        data.nombre = resp.data.nombre_completo
        data.tipo = 'adulto';
    }
    const datos = await Cliente.findOne({dni});
    if (datos) {
        return res.json({
            ok:true,
            msg:'Cliente registrado con exito',
            cliente: datos
        })
    }
    data.dni = dni;
    const cliente = new Cliente(data);
    await cliente.save();
    res.json({
        ok:true,
        msg:'Cliente registrado con exito',
        cliente
    })
}
const putCliente = async(req=request, res=response)=>{
    const {id} = req.params;
    const {dni, nombre, ...data} = req.body;
    const resp = await obtenerDni(dni);
    if (!resp.success && resp.msg !== 'Datos de menor de edad no disponibles en tu plan') {
        res.json({
            ok:false,
            msg: resp.msg
        })
    }
    if(!resp.success && resp.msg === 'Datos de menor de edad no disponibles en tu plan'){
        data.nombre = nombre.toUpperCase();
        data.tipo = 'menor';
        
    }
    if(resp.success) {
        data.nombre = resp.data.nombre_completo
        data.tipo = 'adulto';
    }
    data.dni = dni;
    const cliente = await Cliente.findByIdAndUpdate(id, data, {new:true})
    res.json({
        ok:true,
        msg:'Cliente editado con exito',
        cliente
    })
}
const unblockCliente = async(req=request, res=response)=>{
    const {id} = req.params;
    const {unblock} = req.query;
    const cliente = await Cliente.findByIdAndUpdate(id, {estado:unblock}, {new:true})
    res.json({
        ok:true,
        msg: cliente.estado ? 'Cliente desbloqueado con exito' : 'Cliente bloqueado con exito',
        cliente
    })
}


module.exports = {
    getClientes,
    getCliente,
    postCliente,
    putCliente,
    unblockCliente
}