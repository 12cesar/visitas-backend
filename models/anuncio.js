const { Schema, model } = require("mongoose");

const AnuncioSchema= new Schema({
    descripcion:{
        type: String,
        required:[true, 'La descripcion es obligatoria']
    },
    fecha:{
        type: String,
        required: true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    estado:{
        type:Boolean,
        default:true
    }
})


AnuncioSchema.methods.toJSON = function(){
    const {__v, ...anuncio}= this.toObject();
    return anuncio;
}

module.exports = model('Anuncio', AnuncioSchema)