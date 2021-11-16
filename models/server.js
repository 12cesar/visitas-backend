const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require("express-fileupload");
const http = require('http');
const socketIO = require('socket.io');
const {conectarCliente, mapaSockets, mensajesSockets, multasSockets, anunciosSockets} = require('../sockets/sockets')
class Server{
    static _intance= Server;
    io= socketIO.Server;
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath= '/api/usuarios';
        this.authPath = '/api/auth';
        this.tachosPath = '/api/tachos';
        this.alertaPath = '/api/alertas';
        this.anuncioPath = '/api/anuncios';
        this.clientePath = '/api/clientes';
        this.vehiculoPath = '/api/vehiculos';
        this.conduccionPath = '/api/conduccion';
        this.mensajePath = '/api/mensajes';
        this.rolPath = '/api/role';
        this.multasPath = '/api/multas';
        this.ubicacionPath = '/api/ubicacion';
        this.graficaPath = '/api/graficas';
        this.validarPath = '/api/validar';
        this.pruebaPath = '/api/pruebas';
        this.httpServer = new http.Server(this.app);
        this.io = require('socket.io')(this.httpServer,{
            cors: {
                origin: true,
                credentials: true
              },            
          });
        //Conectar Base de datos
        this.conectarDB();
        //Socket
        this.escucharSockets();
        // Middlewares
        this.middlewares();
        // Rutas de mi aplicacion
        this.routes();
    }
    static get instance(){
        return this._intance || (this._intance=new this());
    }
    async conectarDB(){
        await dbConnection();
    }
    escucharSockets(){
        console.log('Escuchando conexiones - sockets');
        this.io.on('connection', cliente =>{
            console.log('cliente conectado');
            cliente.on('conectado',()=>{
                console.log('cliente conectado');
            })
            conectarCliente( cliente, this.io );
            //Configuracion de mapas
            mapaSockets( cliente, this.io );
            // Configuracion de mensajes
            mensajesSockets(cliente, this.io);
            // Configuracion de multas
            multasSockets(cliente, this.io);
            // Configuracion de anuncios
            anunciosSockets(cliente, this.io)
        });
        
    }
    middlewares(){
        this.app.use(
            fileUpload({
              useTempFiles: true,
              tempFileDir: "/tmp/",
              createParentPath: true,
            })
          );
        // Cors
        this.app.use(cors());
        // Lectura y parseo del body
        this.app.use(express.json());
        // Directorio publico
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.anuncioPath, require('../routes/anuncios'));
        this.app.use(this.clientePath, require('../routes/clientes'));
        this.app.use(this.vehiculoPath, require('../routes/vehiculos'));
        this.app.use(this.conduccionPath, require('../routes/conduccion'));
        this.app.use(this.mensajePath, require('../routes/mensajes'));
        this.app.use(this.rolPath, require('../routes/roles'));
        this.app.use(this.multasPath, require('../routes/multas'));
        this.app.use(this.ubicacionPath, require('../routes/ubicacion'));
        this.app.use(this.graficaPath, require('../routes/graficas'));
        this.app.use(this.validarPath, require('../routes/validar'));
        this.app.use(this.pruebaPath, require('../routes/prueba'));
    }
    listen(){
        this.httpServer.listen(this.port, ()=>{
            console.log(`Escuchando el puerto ${this.port}: http://localhost:${this.port}`);
        });
    }

}

module.exports = Server;