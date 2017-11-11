/**
 * Created by Josue on 10/11/2017.
 */

class bloque{
    constructor(x,y,parteLogica){
        this._coordinador = parteLogica;
        this._ID = this._coordinador.BLOQUENORMAL;
        this._posX = x;
        this._posY = y;
    }

    get getID(){
        return this._ID;
    }
    eliminar(){
        this._coordinador.setObject(this._posX,this._posY,new claseEspacioLibre(this._coordinador));
        //this.coordinador.ejecutarSonido("bloque");
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
    esDestructible(){
        return true;
    }
    espacioLibre(){
        return false;
    }
    esObjetivo(){
        return false;
    }
}
