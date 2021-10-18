const { Schema, model } = require("mongoose");


const ConduccionSchema = new Schema({

    chofer:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required:true
    },
    vehiculo:{
        type: Schema.Types.ObjectId,
        ref:'Vehiculo',
        required:true
    }
})
ConduccionSchema.methods.toJSON = function(){
    const {__v, ...conduccion}= this.toObject();
    return conduccion;
}

module.exports = model('Conduccion', ConduccionSchema)