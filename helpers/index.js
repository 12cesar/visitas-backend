const dbValidators = require("./db-validators");
const generarJWT = require("./generar-jwt");
const subirArchivo = require("./subir-archivo");
const verificarDNI = require('./dni-validators');
module.exports = {
  ...dbValidators,
  ...generarJWT,
  ...subirArchivo,
  ...verificarDNI
};
