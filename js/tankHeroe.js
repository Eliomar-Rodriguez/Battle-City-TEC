
class tankHeroe{
    constructor(x,y,parteLogica){
        this._posX = x;
        this._posY = y;
        this._coordinador = parteLogica;
        this._disparo = false; //DISPARÓ!
        this._vidas = 3;
        this._orientacion = 0;//ARRIBA, VA CAMBIAR CONFORME SE MUEVE
        this._ID = this._coordinador.HEROE;
    }
    get getID(){
        return this._ID;
    }
    set setPosX(x){
        this._posX = x;
    }
    get getPosX(){
        return this._posX;
    }
    set setPosY(y){
        this._posY = y;
    }
    get getPosY(){
        return this._posY;
    }
    set setOrientacion(val){
        this._orientacion = val;
    }
    get getOrientacion(){
        return this._orientacion;
    }
    get getBulletState(){
        return this._disparo;
    }
    set changeBulletState(val){
        this._disparo = val;
    }

    disparar(){
        if(!this._disparo){
            //this.coordinador.ejecutarSonido("SHOOT");
            disparar(this._posX,this._posY,BALAHEROE,this._orientacion);
            this._disparo = true;//SE DISPARÓ
            disparo.play();
        }
        this._disparo = false;
    }

    //LISTO - SE DEBE ENVIAR A DONDE SE DESEA MOVER
    moverHeroe(orientacionActual){
        //VA AGREGAR UN ESPACIO VACIO EN DONDE SE ENCONTRABA EL HEROE, O SEA SE VA EMPEZAR A MOVER
        setObject(this._posX,this._posY,new espacioLibre(this._coordinador));

        if(orientacionActual === ARRIBA){
            this._orientacion = ARRIBA;
            if(getObject(this._posX,this._posY-1).espacioLibre()){
                this._posY = this._posY-1;
            }
        }
        if(orientacionActual === ABAJO){
            this._orientacion = ABAJO;
            if(getObject(this._posX,this._posY+1).espacioLibre()){
                this._posY = this._posY+1;
            }
        }
        if(orientacionActual === IZQUIERDA){
            this._orientacion = IZQUIERDA;
            if(getObject(this._posX-1,this._posY).espacioLibre()){
                this._posX = this._posX-1;
            }
        }
        if(orientacionActual === DERECHA){
            this._orientacion = DERECHA;
            if(getObject(this._posX+1,this._posY).espacioLibre()){
                this._posX = this._posX+1;
            }
        }
        /*ACTUALIZA LA POSICIÓN DEL HEROE*/
        setObject(this._posX,this._posY,this);
    }

    eliminar(){
        this._vidas--;
        if(this._vidas > 0){
            disparoAHeroe.play();
            setObject(this._posX,this._posY,new espacioLibre(this._coordinador));
            this._posX = 7;this._posY = 13;
            this._orientacion = 0;
            setObject(this._posX,this._posY,this);
            document.getElementById("txtVidas").textContent = this._vidas;
            swal(
                'Ouch!!',
                'Una vida menos!!',
                'error'
            );
        }
        else if(this._vidas === 0){
            muerteHeroe.play();
            terminarJuego(false);
        }
    }
    esDestructible(){
        return true;
    }
    esObjetivo(){
        return false;
    }
    espacioLibre(){
        return false;
    }
}