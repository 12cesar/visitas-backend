const { response, Router } = require("express");
const Cliente = require('../models/cliente')
const ClienteGrafica = require("../classes/cliente-grafica");

const router = Router();
const graficalineal = new ClienteGrafica();
router.get('/', async(req= request, res=response)=>{
    const data = graficalineal.getClienteGrafica();
    res.json({
        data
    })
})




module.exports = router;