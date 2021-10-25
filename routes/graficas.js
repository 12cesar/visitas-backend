const { response, Router } = require("express");
const Cliente = require('../models/cliente')
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
})




module.exports = router;