const { response, Router } = require("express");
const Cliente = require('../models/cliente');
const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');
const Multa = require('../models/multa');
const Anuncio = require('../models/anuncio');
const ClienteGrafica = require("../classes/cliente-grafica");
const Datos = require("../classes/datos");

const datos= new Datos();
const router = Router();


const graficalineal = new ClienteGrafica();
router.get('/', async(req= request, res=response)=>{
    
    const fecha = new Date();
    mes= fecha.getMonth();
    ano= fecha.getFullYear();
    graficalineal.resetGrafica();
    for (let mes = 1; mes < 12; mes++) {
        const cliente = await Cliente.count({$and:[{ano},{mes}]});
        graficalineal.incrementarValor(mes, cliente);
    }
    const data = graficalineal.getClienteGrafica();
    res.json({
        data
    })
});
router.get('/list/clientes', async(req= request, res=response)=>{
    datos.resetCliente();
    const cliente=await Cliente.count();
    datos.agregarCliente(cliente);
    res.json(datos.getClientes());
});
router.get('/list/mensajes', async(req= request, res=response)=>{
    datos.resetMensajes();
    const mensajes=await Mensaje.count();
    datos.agregarMensajes(mensajes);
    res.json(datos.getMensajes());
});
router.get('/list/multas', async(req= request, res=response)=>{
    datos.resetMultas();
    const multa=await Multa.count();
    datos.agregarMultas(multa);

    res.json(datos.getMultas());
});
router.get('/list/anuncios', async(req= request, res=response)=>{
    datos.resetAnuncios()
    const anuncio=await Anuncio.count();
    datos.agregarAnuncios(anuncio);
    res.json(datos.getAnuncios());
});




module.exports = router;