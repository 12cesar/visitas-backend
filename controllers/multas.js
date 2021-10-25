const Multa = require('../models/multa');

const getMultas = async(req=request, res=response)=>{
    const {unblock} = req.query;
    const multa= await Multa.find({estado:unblock})
                            .populate('usuario', 'nombre')
    res.json({
        ok:true,
        msg:'Multas mostradas con exito',
        multa
    })
}
const getMulta = async(req=request, res=response)=>{
    const {id} =req.params;
    const multa = await Multa.findById(id)
                                .populate('usuario', 'nombre');
    res.json({
        ok:true,
        msg:'Multa mostrada con exito',
        multa
    })
}

const postMulta = async(req=request, res=response)=>{
    const data = req.body;
    const user = req.usuarioToken;
    const date = new Date();
    const mes = String(date.getMonth());
    const dia = String(date.getDate())
    const fecha = `${(dia.length===1 ? `0${dia}`: dia)}-${(mes.length===1 ? `0${mes}`: mes)}-${date.getFullYear()}`;

    const multa = new Multa(data);
    multa.fecha = fecha;
    multa.usuario = user._id;
    await multa.save();
    res.json({
        ok:true,
        msg:'Multa creado con exito',
        multa
    })
}

const putMulta = async(req=request, res=response)=>{
    const data = req.body;
    const {id} = req.params;
    const multa = await Multa.findByIdAndUpdate(id, data, {new:true}).populate('usuario','nombre');
    res.json({
        ok:true,
        msg:'Multa editada con exito',
        multa
    })
}

const unblockMulta = async(req=request, res=response)=>{
    const {unblock} = req.query;
    const {id} = req.params;

    const multa = await Multa.findByIdAndUpdate(id, {estado:unblock}, {new:true}).populate('usuario', 'nombre');
    res.json({
        ok:true,
        msg: multa.estado ? 'Multa desbloqueada con exito' :'Multa bloqueada con exito',
        multa
    })
}



module.exports ={
    getMultas,
    getMulta,
    postMulta,
    putMulta,
    unblockMulta
}