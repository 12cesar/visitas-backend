const { Socket } = require("socket.io");
const  socketIO  = require("socket.io");
const Datos = require("../classes/datos");
const Mapa = require("../classes/mapa");
const Marcador = require("../classes/marcador");
const  Usuario  = require("../classes/usuario");
const UsuariosLista = require("../classes/usuarios-lista");

const usuariosConectados = new UsuariosLista();
const mapa = new Mapa();
const datos= new Datos();

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

//Evento mensajes

const mensajesSockets= ( cliente= Socket, io= socketIO.Server ) => {

    cliente.on('escuchar-mensaje', (payload={})=>{
        console.log(payload);
        cliente.broadcast.emit('escuchar-mensaje', payload);
    })
    cliente.on('escuchar-cantidadmensaje', (suma)=>{
        datos.agregarMensajes(suma);
        cliente.broadcast.emit('escuchar-cantidadmensaje', suma);
    })
}

//Evento Multas

const multasSockets= ( cliente= Socket, io= socketIO.Server ) => {

    cliente.on('escuchar-cantidadmultas', (suma)=>{
        datos.agregarMultas(suma);
        cliente.broadcast.emit('escuchar-cantidadmultas', suma);
    })
}
//Evento Anuncios
const anunciosSockets= ( cliente= Socket, io= socketIO.Server ) => {

    cliente.on('escuchar-cantidadanuncios', (suma)=>{
        datos.agregarAnuncios(suma);
        cliente.broadcast.emit('escuchar-cantidadanuncios', suma);
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
    mensajesSockets,
    multasSockets,
    anunciosSockets,
    mapa
}