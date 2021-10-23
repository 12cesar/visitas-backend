const { Schema, model } = require("mongoose");

const VehiculoSchema = new Schema({
    nombre:{
        type: String,
        required:[true, 'El nombre es obligatorio']
    },
    marca:{
        type: String,
        required:[true, 'La marca es obligatorio']
    },
    placa:{
        type: String,
        required:[true, 'La placa es obligatorio']
    },
    color:{
        type: String,
        required:[true, 'El color es obligatorio']
    },
    año:{
        type: String,
        required:[true, 'El año es obligatorio']
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required:true
    },
    estado:{
        type: Boolean,
        default:true
    }
});

VehiculoSchema.methods.toJSON = function(){
    const {__v, ...vehiculo}= this.toObject();
    return vehiculo;
}




module.exports = model('Vehiculo', VehiculoSchema);