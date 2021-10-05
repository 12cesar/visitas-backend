const { Router } = require("express");
const {obtenerDni} =require('../helpers');
const router = new Router();

router.post("/", async(req, res) => {
    const {dni} = req.body;
    const resp = await obtenerDni(dni);
    res.json({
        resp
    })
    
});

module.exports = router;
