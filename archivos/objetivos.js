/**
 * Created by Josue on 31/10/2017.
 * Clase que permite crear un objetivo
 */

class objetivos{
    constructor(x,y,totalVida,parteLogica){
        this._posX = x;
        this._posY = y;
        this._coordinador = parteLogica;
        this._ID = this._coordinador.OBJETIVO;
        this._vidaTotal = totalVida;
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
        this._vidaTotal--;//PERDIÓ 1 VIDA
        if(this._vidaTotal == 0){
            this._coordinador.setObject(this._posX,this._posY,new claseEspacioLibre(this._coordinador));
            this._coordinador.terminarJuego(false);
        }
        this._coordinador.actualizar();
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