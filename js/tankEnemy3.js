/**
 * Created by Josue on 31/10/2017.
 */
class tankEnemy3 extends Tank{
    constructor(x,y,parteLogica,id,danio){
        super(id, parteLogica, x, y, Math.floor((Math.random() * 4) + 1) - 1);
        this.danio = danio;
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

        if (matrizLogica[x][y].getID == this._coordinador.EMPTYSPACE){
            debugger;
            tempValue = matrizLogica[this._posX][this._posY];
            matrizLogica[this._posX][this._posY] = matrizLogica[x][y];
            matrizLogica[x][y] = tempValue;
        }

        this._coordinador.getObject(this._posX,this._posY).eliminar();
        if(this._estadoVida){
            this._coordinador.setObject(this._posX,this._posY,this);//SE DESPLAZA EL TANKE SOLO SI SIGUE CON VIDA
        }
        debugger;
        this._coordinador.actualizar();//REFRESH MATRIZ GRAFICA
    }
    /*PERMITE GENERAR UN HILO Y MANTENER EL TANK ENEMIGO MOVIENDOSE EN BUSCA DEL TANK HEROE
    * EL HILO SE TERMINA HASTA QUE EL ESTADO DE VIDA DEL TANK SEA FALSE
    * */
    run(){
        try{
            //crear hilo
        }
        catch (error){
            console.log(error.message);
        }
        while(this._estadoVida){
            var opciones= 0;//CONTADOR QUE DEFINE CUANTAS OPCIONES DISPONIBLES TENGO PARA ESCOGER
            var opcDisponibles = [];//TENDRÁ LAS POSIBLES VIAS PARA DONDE SE PODRÁ DESPLAZAR EL TANK
            if(this._coordinador.getObject(this._posX,this._posY-1).espacioLibre()){ //ARRIBA
                opcDisponibles.push(this._coordinador.ARRIBA);
                opciones++;
            }
            if(this._coordinador.getObject(this._posX,this._posY+1).espacioLibre()){//ABAJO
                opcDisponibles.push(this.coordinador.ABAJO);
                opciones++;
            }
            if(this._coordinador.getObject(this._posX-1,this._posY).espacioLibre()){//IZQUIERDA
                opcDisponibles.push(this._coordinador.IZQUIERDA);
                opciones++;
            }
            if(this.coordinador.getObject(this._posX+1,this._posY).espacioLibre()){//DERECHA
                opcDisponibles.push(this._coordinador.DERECHA);
                opciones++;
            }
            if(opciones != 0){
                var numRandom = this.generarRandom(opciones);
                this.moverTank(opcDisponibles[numRandom]);
            }
            //AQUI TIENE QUE IR LO DE BUSCAR RUTA MÁS CORTA

            //SE ACTUALIZA EL ESTADO DE LA MATRIZ GRAFICA
            this._coordinador.actualizar();
        }
    }

}
