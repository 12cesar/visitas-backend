const jwt = require('jsonwebtoken');
const {response, request} = require('express');
const Usuario = require('../models/usuario');
const Cliente = require('../models/cliente');
const validarJWT =async (req= request, res = response, next)=>{ 
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const {id} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // leer el usuario

        const usuario = await Usuario.findOne({_id: id});

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en BD'
            })
        }
        
        // Verificar si el uid tiene estado en tru
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado : false'
            })
        }
        if (usuario.rol !== 'ADMIN_ROLE') {
            return res.status(401).json({
                msg: 'Token no valido - usuario no es administrador'
            })
        }
        req.usuarioToken = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
    
    
}
const validarJWTChofer =async (req= request, res = response, next)=>{ 
    const token = req.header('token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const {id} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // leer el usuario

        const usuario = await Usuario.findOne({_id: id});

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en BD'
            })
        }
        
        // Verificar si el uid tiene estado en tru
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado : false'
            })
        }
        req.usuarioToken = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
    
    
}

const validarJWTContribuyente =async (req= request, res = response, next)=>{ 
    const token = req.header('token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }
    try {
        const {id} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        // leer el usuario
        const cliente = await Cliente.findOne({_id: id});
        if (!cliente) {
            return res.status(401).json({
                msg: 'Token no valido - contribuyente no existe en BD'
            })
        }
        // Verificar si el uid tiene estado en tru
        if (!cliente.estado) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado : false'
            })
        }
        req.clienteToken = cliente;
        next();
    } catch (error) {
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}
module.exports = {
    validarJWT,
    validarJWTChofer,
    validarJWTContribuyente  
}