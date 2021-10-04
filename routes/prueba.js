const { Router } = require("express");
const fs = require("fs");
const {obtenerDni} =require('../helpers');
const router = new Router();

router.post("/", async(req, res) => {
    const {dni} = req.body;
    const data = await obtenerDni(dni);
    res.json({
        data
    })
    
});

module.exports = router;
