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
        debugger;
        var coordinador = this._coordinador;
        //while(this._estadoVida){
            var opciones= 0;//CONTADOR QUE DEFINE CUANTAS OPCIONES DISPONIBLES TENGO PARA ESCOGER
            var camDisponibles = [];//TENDRÁ LAS POSIBLES VIAS PARA DONDE SE PODRÁ DESPLAZAR EL TANK
            if(coordinador = getObject(this._posX,this._posY-1).espacioLibre()){ //ARRIBA
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
                debugger;
                this.moverTank(camDisponibles[numRandom]);
            }

        //}
    }

    moverTank(orientacion){
        var sigEspacio;
        var x = this._posX,
            y = this._posY;
        console.log(matrizLogica[x][y]);
        if(orientacion == this._coordinador.ARRIBA){
            this._posY = this._posY-1;
        }
        else if(orientacion == this._coordinador.ABAJO){
            this._posY = this._posY+1;
        }
        else if(orientacion == this._coordinador.IZQUIERDA){
            this._posX = this._posX-1;
        }
        else if(orientacion == this._coordinador.DERECHA){
            this._posX = this._posX+1;
        }
        debugger;

        if (matrizLogica[this._posX][this._posY]._ID == this._coordinador.EMPTYSPACE){ // compara la siguiente posicion (elegida) con espacio
            debugger;
            sigEspacio = matrizLogica[this._posX][this._posY]; // guarda la siguiente pos
            matrizLogica[this._posX][this._posY] = matrizLogica[x][y]; // a la pos siguiente le pongo el heroe encima para que se mueva
            matrizLogica[x][y] = sigEspacio;
            matrizLogica[x][y].setPosX(this._posX);
            matrizLogica[x][y].setPosY(this._posY);
        }
        var movimientoRandom = Math.floor((Math.random() * 3) + 1); // 0 arriba, 1 abajo, 2 izq, 3 der
        if (movimientoRandom == this.getCoordinador.ARRIBA) {
            if (matrizLogica[this._posX][this._posY - 1].getID == this.getCoordinador.EMPTYSPACE) { // espacio vacio arriba
                matrizLogica[this._posX][this._posY - 1] = matrizLogica[this._posX][this._posY]; // pongo enemy en la pos del espacio libre
                matrizLogica[this._posX][this._posY] = new espacioLibre(this.getCoordinador); // pongo un espacio libre donde estaba el enemy
            }
            else{
                this.moverTank();
            }
        }
        else if (movimientoRandom == this.getCoordinador.ABAJO) {
            if (matrizLogica[this._posX][this._posY + 1].getID == this.getCoordinador.EMPTYSPACE) { // espacio vacio arriba
                matrizLogica[this._posX][this._posY + 1] = matrizLogica[this._posX][this._posY];
                matrizLogica[this._posX][this._posY] = new espacioLibre(this.getCoordinador);
            }
            else{
                this.moverTank();
            }
        }
        else if (movimientoRandom == this.getCoordinador.IZQUIERDA) {
            if (matrizLogica[this._posX-1][this._posY].getID == this.getCoordinador.EMPTYSPACE) { // espacio vacio arriba
                matrizLogica[this._posX-1][this._posY] = matrizLogica[this._posX][this._posY];
                matrizLogica[this._posX][this._posY] = new espacioLibre(this.getCoordinador);
            }
            else{
                this.moverTank();
            }
        }
        else if (movimientoRandom == this.getCoordinador.DERECHA) {
            if (matrizLogica[this._posX+1][this._posY].getID == this.getCoordinador.EMPTYSPACE) { // espacio vacio arriba
                matrizLogica[this._posX+1][this._posY] = matrizLogica[this._posX][this._posY];
                matrizLogica[this._posX][this._posY] = new espacioLibre(this.getCoordinador);
            }
            else{
                this.moverTank();
            }
        }

        //>>>>>this._coordinador.actualizar();//REFRESH MATRIZ GRAFICA
        //this._coordinador.getObject(this._posX,this._posY).eliminar();
        /*if(this._estadoVida){
            this._coordinador.setObject(this._posX,this._posY,this);//SE DESPLAZA EL TANKE SOLO SI SIGUE CON VIDA
        }
        debugger;*/
    }

    generarRandom(limite){
        return Math.floor((Math.random() * limite) + 1) - 1;
    }
}