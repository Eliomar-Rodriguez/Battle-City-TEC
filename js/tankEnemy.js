/**
 * Created by Josue on 31/10/2017.
 */
class tankEnemy extends Tank{
    constructor(x,y,vidaTotal,velocidad,parteLogica,id){
        super(id, parteLogica, x, y, Math.floor((Math.random() * 4) + 1) - 1, vidaTotal);
        this._estadoVida = true;
        this._velocidadTanke = velocidad;
    }
    get getID(){
        return this._ID;
    }
    get getOrientacion(){
        return this._orientacion;
    }
    set setOrientacion(orientacion){
        this._orientacion = orientacion;
    }
    get getPosX(){
        return this._posX;
    }
    set setPosX(x){
        this._posX = x;
    }
    get getPosY(){
        return this._posY;
    }
    set setPosY(y){
        this._posY = y;
    }
    get getEstadoVida(){
        return this._estadoVida;
    }
    set setEstadoVida(value){
        this._estadoVida = value;
    }
    get getVidaTotal(){
        return this._vidaTotal
    }
    set setVidaTotal(value){
        this._vidaTotal = value;
    }
    get getVelocidadTanke(){
        return this._velocidadTanke;
    }
    set setVelocidadTanke(value){
        this._velocidadTanke = value;
    }
    esDestructible(){
        return true;
    }
    espacioLibre(){
        return false;
    }
    esObjetivo(){
        return true;
    }
    eliminar(){
        this._vidaTotal--;
        if(this._vidaTotal == 0){
            this._estadoVida = false;
            this._coordinador.borrarEnemigo(this._posX,this._posY);
            //this.coordinador.ejecutarSonido("destruir");
        }

    }
    generarRandom(limite){
        return Math.floor((Math.random() * limite) + 1);
    }
    moverTank(orientacion){
        var x,y,tempValue;
        if(orientacion == this._coordinador.ARRIBA){
            y = this._posY-1;
        }
        else if(orientacion == this._coordinador.ABAJO){
            y = this._posY+1;
        }
        if(orientacion == this._coordinador.IZQUIERDA){
            x = this._posX-1;
        }
        else if(orientacion == this._coordinador.DERECHA){
            x = this._posX+1;
        }

        /*if (matrizLogica[x][y].getID == this._coordinador.EMPTYSPACE){
            debugger;
            tempValue = matrizLogica[x][y]; // guarda la pos siguiente
            matrizLogica[x][y] = matrizLogica[this._posX][this._posY]; // a la pos siguiente le pongo el heroe encima para que se mueva
            matrizLogica[this._posX][this._posY] = tempValue;
            matrizLogica[x][y].setPosX(x);
            matrizLogica[x][y].setPosY(y);
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
        }*/

        //>>>>>this._coordinador.actualizar();//REFRESH MATRIZ GRAFICA
        //this._coordinador.getObject(this._posX,this._posY).eliminar();
        /*if(this._estadoVida){
            this._coordinador.setObject(this._posX,this._posY,this);//SE DESPLAZA EL TANKE SOLO SI SIGUE CON VIDA
        }
        debugger;*/
    }
    /*PERMITE GENERAR UN HILO Y MANTENER EL TANK ENEMIGO MOVIENDOSE EN BUSCA DEL TANK HEROE
    * EL HILO SE TERMINA HASTA QUE EL ESTADO DE VIDA DEL TANK SEA FALSE
    * */
    run(){

        while(this._estadoVida){
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
                var numRandom = this.generarRandom(opciones);debugger;
                moverTank(camDisponibles[numRandom]);
            }
            //AQUI TIENE QUE IR LO DE BUSCAR RUTA MÁS CORTA

            //SE ACTUALIZA EL ESTADO DE LA MATRIZ GRAFICA
            //>>>>>this._coordinador.actualizar();

        }
    }

}
