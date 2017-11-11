/**
 * Created by Josue on 10/11/2017.
 */
class bala{
    constructor(x,y,orientacion,balaTanke,parteLogica){
        this._coordinador = parteLogica;
        this._ID = this._coordinador.BULLET;
        this._posX = x;
        this._posY = y;
        this._orientacion = orientacion;
        this._tipoBala = balaTanke;//BALA PERTENECE A UN TANKE
        this._estadoBala = true;
        this._listaBalas = [];
    }
    get getOrientacion(){
        return this._orientacion;
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
    get getTipoBala(){
        return this._tipoBala;
    }
    set setTipoBala(val){
        this._tipoBala = val;
    }
    get getEstadoBala(){
        return this._estadoBala;
    }
    set setEstadoBala(estado){
        this._estadoBala = estado;
    }
    addBullet(bala){
        this._listaBalas.push(bala);
    }
    removeLastBullet(){
        this._coordinador.setObject(this._listaBalas[-1]._posX,this._listaBalas[-1]._posY,new claseEspacioLibre(this._coordinador));
        this._listaBalas.pop();
    }
    moverBala(orientacion){
        var solicitud;
        if(orientacion == this._coordinador.ARRIBA){
            this._orientacion = this._coordinador.ARRIBA;
            solicitud = this._coordinador.getObject(this._posX,this._posY-1);
            if(solicitud.espacioLibre()){
                this._posY--;//SIGA MOVIENDOSE
                this._coordinador.setObject(this._posX,this._posY,this);
            }
            if(solicitud.esDestructible()){
                if(this._tipoBala == this._coordinador.BALAHEROE){//DESTRUYE LOS OBJETOS
                    solicitud.eliminar();//DEPEDIENDO DEL OBJETO A QUIEN PERTENEZCA ACCIONA ALGO
                    this._estadoBala = false;
                }
                if(this._tipoBala == this._coordinador.BALAENEMIGO){
                    if(solicitud.getID == this._coordinador.HEROE){
                        solicitud.eliminar();
                        this._estadoBala = false;
                    }
                }
            }
            if(solicitud.getID == this._coordinador.BORDE){
                this._estadoBala = false;
            }
        }
        if(orientacion == this._coordinador.ABAJO){
            this._orientacion = this._coordinador.ABAJO;debugger;
            solicitud = this._coordinador.getObject(this._posX,this._posY+1);
            if(solicitud.espacioLibre()){
                this._posY++;
                this._coordinador.setObject(this._posX,this._posY,this);
            }
            if(solicitud.esDestructible()){
                if(this._tipoBala == this._coordinador.BALAHEROE){//DESTRUYE LOS OBJETOS
                    solicitud.eliminar();//DEPEDIENDO DEL OBJETO A QUIEN PERTENEZCA ACCIONA ALGO
                    this._estadoBala = false;
                }
                if(this._tipoBala == this._coordinador.BALAENEMIGO){
                    if(solicitud.getID == this._coordinador.HEROE){
                        solicitud.eliminar();
                        this._estadoBala = false;
                    }
                }
            }
            if(solicitud.getID == this._coordinador.BORDE){
                this._estadoBala = false;
            }
        }
        if(orientacion == this._coordinador.IZQUIERDA){
            this._orientacion = this._coordinador.IZQUIERDA;
            solicitud = this._coordinador.getObject(this._posX-1,this._posY);
            if(solicitud.espacioLibre()){
                this._posX--;
                this._coordinador.setObject(this._posX,this._posY,this);
            }
            if(solicitud.esDestructible()){
                if(this._tipoBala == this._coordinador.BALAHEROE){//DESTRUYE LOS OBJETOS
                    solicitud.eliminar();//DEPEDIENDO DEL OBJETO A QUIEN PERTENEZCA ACCIONA ALGO
                    this._estadoBala = false;
                }
                if(this._tipoBala == this._coordinador.BALAENEMIGO){
                    if(solicitud.getID == this._coordinador.HEROE){
                        solicitud.eliminar();
                        this._estadoBala = false;
                    }
                }
            }
            if(solicitud.getID == this._coordinador.BORDE){
                this._estadoBala = false;
            }
        }
        if(orientacion == this._coordinador.DERECHA){
            this._orientacion = this._coordinador.DERECHA;
            solicitud = this._coordinador.getObject(this._posX+1,this._posY);
            if(solicitud.espacioLibre()){
                this._posX++;
                this._coordinador.setObject(this._posX,this._posY,this);
            }
            if(solicitud.esDestructible()){
                if(this._tipoBala == this._coordinador.BALAHEROE){//DESTRUYE LOS OBJETOS
                    solicitud.eliminar();//DEPEDIENDO DEL OBJETO A QUIEN PERTENEZCA ACCIONA ALGO
                    this._estadoBala = false;
                }
                if(this._tipoBala == this._coordinador.BALAENEMIGO){
                    if(solicitud.getID == this._coordinador.HEROE){
                        solicitud.eliminar();
                        this._estadoBala = false;
                    }
                }
            }
            if(solicitud.getID == this._coordinador.BORDE){
                this._estadoBala = false;
            }
        }

        /*ACTUALIZA LA MATRIZ*/
        //this._coordinador.actualizar();
        //this._coordinador.setObject(this._posX,this._posY,new claseEspacioLibre(this._coordinador));
    }
    destruirObjeto(x,y,objeto){
        this._coordinador.setObject(x,y,objeto);
        //this.coordinador.destruirTankEnemigo(x,y);
        //this.coordinador.ejecutarSonido("destruir");
    }

    run(){
        while(this._estadoBala){//debugger;
            //$interval(function () {
            this.moverBala(this._orientacion)
            //},5000);
            //this._coordinador.actualizar();
        }



    }

    esDestructible(){
        return false;
    }
    espacioLibre(){
        return false;
    }
}