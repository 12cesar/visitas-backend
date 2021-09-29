const { Schema, model } = require("mongoose");

const ClienteSchema = new Schema({
    dni:{
        type: Number,
        required:[true, 'El dni es obligatorio']
    },
    nombre:{
        type: String,
        required:[true, 'El nombre es obligatorio']
    },
    direccion:{
        type:String,
        required:[true, 'La direccion es obligatoria']
    },
    estado:{
        type:Boolean,
        default: true
    }
});



module.exports = model('Cliente', ClienteSchema);