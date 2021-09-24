const { Schema, model } = require("mongoose");

const CategoriaSchema = new Schema({

    descripcion:{
        type: String,
        required:[true, 'La descripcion es obligatoria']
    },
    estado:{
        type: Boolean,
        default: true
    }
});


CategoriaSchema.methods.toJSON = function(){
    const {__v, ...categoria}= this.toObject();
    return categoria;
}

module.exports = model('Categoria', CategoriaSchema);