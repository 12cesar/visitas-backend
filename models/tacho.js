const { Schema, model } = require("mongoose");

const TachoSchema = new Schema({
    nombre:{
        type: String
    },
    direccion:{
        type: String
    },
    ltd:{
        type:Number,
        required:[true, 'La latitud es obligatoria']
    },
    lng:{
        type: Number,
        required:[true, 'La longitud es obligatoria']
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    estado:{
        type: Boolean,
        default: true
    }
});


TachoSchema.methods.toJSON = function(){
    const {__v, ...tacho}= this.toObject();
    return tacho;
}

module.exports = model('Tacho', TachoSchema);