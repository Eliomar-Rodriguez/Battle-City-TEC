class Tank{
    constructor(ID,parteLogica,x,y,o) {
        this._ID = ID;
        this._coordinador = parteLogica;
        this._posX = x;
        this._posY = y;
        this._orientacion = o;
        this._estadoVida = true;
    }
    get getEstadoVida(){
        return this._estadoVida;
    }
    set setEstadoVida(e){
        this._estadoVida = e;
    }
    get getID() {
        return this._ID;
    }
    set setID(value) {
        this._ID = value;
    }
    get getCoordinador(){
        return this._coordinador;
    }
    set setCoordinador(c){
        this._coordinador = c;
    }
    get getPosX() {
        return this._posX;
    }
    set setPosX(value) {
        this._posX = value;
    }
    get getPosY() {
        return this._posY;
    }
    set setPosY(value) {
        this._posY = value;
    }
    get getOrientacion() {
        return this._orientacion;
    }
    set setOrientacion(value) {
        this._orientacion = value;
    }

    /*PERMITE GENERAR UN HILO Y MANTENER EL TANK ENEMIGO MOVIENDOSE EN BUSCA DEL TANK HEROE
    * EL HILO SE TERMINA HASTA QUE EL ESTADO DE VIDA DEL TANK SEA FALSE
    * */
    run(){
        var opciones= 0;//CONTADOR QUE DEFINE CUANTAS OPCIONES DISPONIBLES TENGO PARA ESCOGER
        var camDisponibles = [];//TENDRÁ LAS POSIBLES VIAS PARA DONDE SE PODRÁ DESPLAZAR EL TANK
        if(this._coordinador.getObject(this._posX,this._posY-1).espacioLibre()){ //ARRIBA
            camDisponibles.push(this._coordinador.ARRIBA);
            opciones++;
        }
        if(this._coordinador.getObject(this._posX,this._posY+1).espacioLibre()){//ABAJO
            camDisponibles.push(this._coordinador.ABAJO);
            opciones++;
        }
        if(this._coordinador.getObject(this._posX-1,this._posY).espacioLibre()){//IZQUIERDA
            camDisponibles.push(this._coordinador.IZQUIERDA);
            opciones++;
        }
        if(this._coordinador.getObject(this._posX+1,this._posY).espacioLibre()){//DERECHA
            camDisponibles.push(this._coordinador.DERECHA);
            opciones++;
        }
        if(opciones != 0){
            var numRandom = this.generarRandom(opciones);
            this.moverTank(camDisponibles[numRandom]);
        }
    }

    moverTank(orientacion){
        this._coordinador.setObject(this._posX,this._posY,new espacioLibre(this._coordinador));
        if(orientacion == this._coordinador.ARRIBA){
            this._orientacion = this._coordinador.ARRIBA;
            this._posY = this._posY-1;
        }
        else if(orientacion == this._coordinador.ABAJO){
            this._orientacion = this._coordinador.ABAJO;
            this._posY = this._posY+1;
        }
        else if(orientacion == this._coordinador.IZQUIERDA){
            this._orientacion = this._coordinador.IZQUIERDA;
            this._posX = this._posX-1;
        }
        else if(orientacion == this._coordinador.DERECHA){
            this._orientacion = this._coordinador.DERECHA;
            this._posX = this._posX+1;
        }
        this._coordinador.setObject(this._posX,this._posY,this);
    }
    generarRandom(limite){
        return Math.floor((Math.random() * limite) + 1) - 1;
    }
}