const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath= '/api/usuarios';
        this.authPath = '/api/auth';
        this.tachosPath = '/api/tachos';
        this.alertaPath = '/api/alertas';
        this.anuncioPath = '/api/anuncios';
        this.clientePath = '/api/clientes';
        this.pruebaPath = '/api/pruebas';
        
        //Conectar Base de datos
        this.conectarDB();
        // Middlewares
        this.middlewares();
        // Rutas de mi aplicacion
        this.routes();
    }
    async conectarDB(){
        await dbConnection();
    }
    middlewares(){
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
        this.app.use(this.tachosPath, require('../routes/tachos'));
        this.app.use(this.anuncioPath, require('../routes/anuncios'));
        this.app.use(this.clientePath, require('../routes/clientes'));
        this.app.use(this.pruebaPath, require('../routes/prueba'));
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Escuchando el puerto ${this.port}: http://localhost:${this.port}`);
        });
    }

}

module.exports = Server;