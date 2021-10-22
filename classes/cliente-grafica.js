


class ClienteGrafica{

    datos = [10,20,30,40,50,60,70,80,90,10,11,12]
    label = [0,1,2,3,4,5,6,7,8,9,10,11,12]
    
    constructor(){
        
    }


    getClienteGrafica(){
        return [{data:this.datos, label: 'Clientes'}]
    }
}

module.exports =ClienteGrafica;