const { Schema, model } = require("mongoose");

const ClienteSchema = new Schema({
    dni:{
        type: String,
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
    tipo:{
        type:String
    },
    img:{
        type:String
    },
    estado:{
        type:Boolean,
        default: true
    }
});
ClienteSchema.methods.toJSON = function(){
    const {__v, ...cliente}= this.toObject();
    return cliente;
}



module.exports = model('Cliente', ClienteSchema);