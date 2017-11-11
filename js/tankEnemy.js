/**
 * Created by Josue on 31/10/2017.
 */
class tankEnemy{
    constructor(x,y,vidaTotal,velocidad,parteLogica){
        this._coordinador = parteLogica;
        this._ID = this._coordinador.ENEMY;
        this._posX = x;
        this._posY = y;
        this._estadoVida = true;
        this._vidaTotal = vidaTotal;
        this._velocidadTanke = velocidad;
    }
    get getID(){
        return this._ID;
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
        if(orientacion == this._coordinador.ARRIBA){
            this._posY = this._posY-1;
        }
        if(orientacion == this._coordinador.ABAJO){
            this._posY = this._posY+1;
        }
        if(orientacion == this._coordinador.IZQUIERDA){
            this._posX = this._posX-1;
        }
        if(orientacion == this._coordinador.DERECHA){
            this._posX = this._posX+1;
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
