
const { request, response } = require('express');
const Cliente = require('../models/cliente');

class ClienteGrafica{

    
    
    datos = [10,20,30,40,10,20,30,40,10,20,30,40]
    meses = [1,2,3,4,5,6,7,8,9,10,11,12]
    
    constructor(){
    }


    getClienteGrafica(){
        return [{data:this.datos, label: 'Clientes'}]
    }
    incrementarValor(me, valor){
        for(let i in this.meses){
            if (this.meses[i]===me) {
                this.datos[i] += valor;
            }
        }
        return this.getClienteGrafica();
    }
    getCliente(){
        
    }
}

module.exports =ClienteGrafica;