const { Schema, model } = require("mongoose");


const MensajeSchema = new Schema({
    titulo:{
        type: String,
        required:[true, 'El titulo es obligatorio']
    },
    descripcion:{
        type: String,
        required:[true, 'La descripcion es obligatorio']
    },
    fecha:{
        type: String
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    estado:{
        type: Boolean,
        default: true
    }
})
MensajeSchema.methods.toJSON = function(){
    const {__v, ...mensaje}= this.toObject();
    return mensaje;
}
module.exports = model('Mensaje', MensajeSchema)