const { request, response } = require("express")
const Tacho = require('../models/tacho');

const getTachos = async(req = request, res = response)=>{
    const {unblock} = req.query;
    const tachos = await Tacho.find({estado:unblock})
                                .populate('usuario', 'nombre')
    res.json({
        ok:true,
        msg:'Tachos mostrados con exito',
        tachos,
    })
}
const getTacho = async(req = request, res = response)=>{
    const {id} = req.params;
    const tacho = await Tacho.findById(id)
                                .populate('usuario', 'nombre');
    res.json({
        ok:true,
        msg:'Tacho mostrado con exito',
        tacho
    })
}

const postTacho = async(req = request, res = response)=>{
    const {nombre,usuario, ...data} = req.body;
    const usuarioTok = req.usuarioToken;
    data.nombre = nombre.toUpperCase();
    data.usuario = usuarioTok._id;
    const tacho = new Tacho(data);
    tacho.save();
    res.json({
        ok:true,
        msg:'Tacho creado con exito',
        tacho,
    })
}

const putTacho = async(req = request, res = response)=>{
    const {id} = req.query;
    const {nombre, usuario,...data} = req.body;
    const user = req.usuarioToken;
    if (nombre) {
        data.nombre = nombre.toUpperCase();
    }
    data.usuario = user._id;
    const tacho = await Tacho.findByIdAndUpdate(id, data, {new:true});
    res.json({
        ok:true,
        msg:'Tacho editado con exito',
        tacho
    })
}
const unblockTacho = async(req = request, res = response)=>{
    const {id} = req.params;
    const {unblock} = req.query;
    const tacho = await Tacho.findByIdAndUpdate(id, {estado:unblock}, {new:true} )
    res.json({
        ok:true,
        msg: !tacho.estado ? 'Tacho bloqueado correctamente' : 'Tacho desbloqueado correctamente',
        tacho
    })
}

module.exports = {
    getTachos,
    getTacho,
    postTacho,
    putTacho,
    unblockTacho
}