const Marcador = require("./marcador");

class Mapa {
  marcadores = {};
  constructor() {}

  agregarMarcador(marcador=Marcador){
    this.marcadores[marcador.id]=marcador;
  }
  getMarcadores() {
    return this.marcadores;
  }
  borrarMarcador(id = "") {
    delete this.marcadores[id];
    return this.getMarcadores;
  }
  moverMarcador(marcador = {}) {
    this.marcadores[marcador.id].lng = marcador.lng;
    this.marcadores[marcador.id].lat = marcador.lat;
  }
}

module.exports = Mapa;
