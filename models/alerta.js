const { Schema, model } = require("mongoose");

const AlertaSchema = new Schema({
    descripcion:{
        type:String,
        required:[true, 'La descripcion es obligatoria']
    },
    fecha:{
        type: String,
        required:[true, 'La fecha es obligatoria']
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref:'Usuario'
    },
    estado:{
        type: Boolean,
        default:true
    }
});

AlertaSchema.methods.toJSON = function(){
    const {__v, ...alerta}= this.toObject();
    return alerta;
}

module.exports = model('Alerta', AlertaSchema);