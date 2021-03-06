
const { request, response } = require('express');
const Cliente = require('../models/cliente');

class ClienteGrafica{

    
    
    datos = [0,0,0,0,0,0,0,0,0,0,0,0]
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
    resetGrafica(){
        this.datos =[0,0,0,0,0,0,0,0,0,0,0,0];
        //this.getClienteGrafica()
    }
}

module.exports =ClienteGrafica;