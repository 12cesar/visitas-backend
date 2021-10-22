const { response, Router } = require("express");
const Cliente = require('../models/cliente')
const ClienteGrafica = require("../classes/cliente-grafica");

const router = Router();
const graficalineal = new ClienteGrafica();
router.get('/', async(req= request, res=response)=>{
    const fecha = new Date();
    const ano = fecha.getFullYear();
    const data = await graficalineal.getClienteGrafica();
    console.log(data);
})



module.exports = router;