const { Socket } = require("socket.io");
const  socketIO  = require("socket.io");
const Mapa = require("../classes/mapa");
const Marcador = require("../classes/marcador");
const  Usuario  = require("../classes/usuario");
const UsuariosLista = require("../classes/usuarios-lista");

const usuariosConectados = new UsuariosLista();
const mapa = new Mapa();
//Eventos de mapa
const mapaSockets = ( cliente= Socket, io= socketIO.Server ) => {

    cliente.on('marcador-nuevo', (marcador=Marcador)=>{
        mapa.agregarMarcador(marcador);
        cliente.broadcast.emit('marcador-nuevo', marcador);
    })
    cliente.on('marcador-borrar', (id='')=>{
        mapa.borrarMarcador(id);
        cliente.broadcast.emit('marcador-borrar', id);
    })
    cliente.on('marcador-mover', (marcador=Marcador)=>{
        mapa.moverMarcador(marcador);
        cliente.broadcast.emit('marcador-mover', marcador);
    })
}




const conectarCliente = ( cliente= Socket, io= socketIO.Server ) => {

    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar( usuario );

}

//Eventos de mapa


module.exports ={
    conectarCliente,
    mapaSockets,
    mapa
}