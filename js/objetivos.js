/**
 * Created by Josue on 31/10/2017.
 * Clase que permite crear un objetivo
 */

class objetivos{
    constructor(x,y,parteLogica,id){
        this._posX = x;
        this._posY = y;
        this._coordinador = parteLogica;
        this._ID = id;
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
        return this._posX;
    }
    set setPosY(y){
        this._posY = y;
    }
    eliminar(){
        muerteObjeto.play();
        this._coordinador.setObject(this._posX,this._posY,new espacioLibre(this._coordinador));
        this._coordinador.restarObjetivos();
        this._coordinador.verificarEstadoJuego();
    }

    espacioLibre(){
        return false;
    }
    esDestructible(){
        return true;
    }
    esObjetivo(){
        return true;
    }
}