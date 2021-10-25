class Datos {

    clientes=0;
    mensajes=0;
    multas=0;
    anuncios=0
    constructor(){}

    getClientes(){
        return {ok:true, cliente:this.clientes}
    }
    getMensajes(){
        return {ok:true, mensaje:this.mensajes}
    }
    getMultas(){
        return {ok:true, multa:this.multas}
    }
    getAnuncios(){
        return {ok:true, anuncio:this.anuncios}
    }

    agregarCliente(valor){
        this.clientes =this.clientes + valor;
        this.getClientes()
    }
    agregarMensajes(valor){
        this.mensajes = this.mensajes+ valor;
        this.getMensajes()
    }
    agregarMultas(valor){
        this.multas = this.multas + valor;
        this.getMultas()
    }
    agregarAnuncios(valor){
        this.anuncios = this.anuncios + valor;
        this.getAnuncios()
    }

    resetCliente(){
        this.clientes = 0;
        this.getClientes();
    }
    resetMensajes(){
        this.mensajes = 0;
        this.getMensajes();
    }
    resetMultas(){
        this.multas = 0;
        this.getMultas();
    }
    resetAnuncios(){
        this.anuncios = 0;
        this.getAnuncios();
    }

}

module.exports = Datos;