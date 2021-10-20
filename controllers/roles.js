const { request, response } = require("express")
const Role = require('../models/role')


const getRoles=async(req=request, res=response)=>{

    const roles = await Role.find();
    res.json({
        ok:true,
        msg:'Roles mostrado con exito',
        roles
    })
}


module.exports ={
    getRoles
}