const { Schema, model } = require("mongoose");

const TipoSchema = new Schema({
    descripcion:{
        type: String,
        required:[true, 'El tipo es oblogatorio']
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref:'Categoria',
        required:true
    },
    estado:{
        type: Boolean,
        default: true
    }
});

TipoSchema.methods.toJSON = function(){
    const {__v, ...tipo}= this.toObject();
    return tipo;
}

module.exports = model('Tipo', TipoSchema);