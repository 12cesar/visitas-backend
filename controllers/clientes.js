const { request, response } = require("express")
const { obtenerDni } = require("../helpers")
const Cliente = require('../models/cliente');
const bcryptjs = require("bcryptjs");
const generarToken = require('../helpers/generar-jwt');
const ClienteGrafica = require("../classes/cliente-grafica");
const Server = require("../models/server");

const grafica = new ClienteGrafica();


const getClientes = async(req=request, res=response)=>{
    const {unblock} = req.query;
    const cliente = await Cliente.find({estado:unblock});
    res.json({
        ok:true,
        msg:'Clientes mostrado con exito',
        cliente,
        token:null
    })
}
const getCliente = async(req=request, res=response)=>{
    const {id} = req.params;
    const cliente = await Cliente.findById(id);
    res.json({
        ok:true,
        msg:'Cliente mostrado con exito',
        cliente,
        token:null
    })
}
const postCliente = async(req=request, res=response)=>{
    const {dni, nombre, password, ...data} = req.body;
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
    const fecha = new Date();
    const mes = fecha.getMonth();
    console.log(mes+1);
    const ano = fecha.getFullYear();
    const salt = bcryptjs.genSaltSync();
    data.dni = dni;
    const cliente = new Cliente(data);
    cliente.password = bcryptjs.hashSync(password, salt);
    cliente.mes = mes+1;
    cliente.ano=ano;
    const token = await generarToken.generarJWT(cliente._id);
    grafica.incrementarValor(mes+1, 1);
    const server = new Server.instance;
    server.io.emit('cambio-grafica', grafica.getClienteGrafica());
    await cliente.save();
    res.json({
        ok:true,
        msg:'Cliente registrado con exito',
        cliente,
        token
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
        cliente,
        token:null
    })
}
const unblockCliente = async(req=request, res=response)=>{
    const {id} = req.params;
    const {unblock} = req.query;
    const cliente = await Cliente.findByIdAndUpdate(id, {estado:unblock}, {new:true})
    res.json({
        ok:true,
        msg: cliente.estado ? 'Cliente desbloqueado con exito' : 'Cliente bloqueado con exito',
        cliente,
        token:null
    })
}


module.exports = {
    getClientes,
    getCliente,
    postCliente,
    putCliente,
    unblockCliente
}