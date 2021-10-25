const { response, Router } = require("express");
const Cliente = require('../models/cliente');
const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');
const Multa = require('../models/multa');
const Anuncio = require('../models/anuncio');
const ClienteGrafica = require("../classes/cliente-grafica");

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
router.get('/list/usuarios', async(req= request, res=response)=>{
    const usuario=await Usuario.count();
    res.json({
        ok:true,
        usuario
    });
});
router.get('/list/mensajes', async(req= request, res=response)=>{
    const mensajes=await Mensaje.count();
    res.json({
        ok:true,
        mensajes
    });
});
router.get('/list/multas', async(req= request, res=response)=>{
    const multa=await Multa.count();
    res.json({
        ok:true,
        multa
    });
});
router.get('/list/anuncios', async(req= request, res=response)=>{
    const anuncio=await Anuncio.count();
    res.json({
        ok:true,
        anuncio
    });
});




module.exports = router;