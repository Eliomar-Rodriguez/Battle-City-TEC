/**
 * Created by Josue on 31/10/2017.
 */
class tankEnemy1 extends Tank{
    constructor(x,y,velocidad,parteLogica,id){
        super(id, parteLogica, x, y, Math.floor((Math.random() * 4) + 1) - 1);
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
