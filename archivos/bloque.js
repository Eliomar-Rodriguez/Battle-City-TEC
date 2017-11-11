/**
 * Created by Josue on 10/11/2017.
 */

class bloque{
    constructor(x,y,ID){
        this._ID = ID;
        this._posX = x;
        this._posY = y;
    }

    get getID(){
        return this._ID;
    }
    eliminar(){
        setObject(this._posX,this._posY,new claseEspacioLibre());
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
