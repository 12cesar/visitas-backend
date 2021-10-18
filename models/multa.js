const { Schema, model } = require("mongoose");


const MultaSchema = new Schema({
    titulo:{
        type: String,
        required:[true, 'El titulo es obligatorio']
    },
    descripcion:{
        type:String,
        required:[true, 'La descripcion es obligatorio']
    },
    resolucion:{
        type: String,
        required:[true, 'La resolucion es obligatorio']
    },
    fecha:{
        type: String
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required:true
    },
    estado:{
        type: Boolean,
        default: true
    }

})


module.exports = model('Multa', MultaSchema)