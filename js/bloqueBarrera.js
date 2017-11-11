/**
 * Created by Josue on 10/11/2017.
 */
class bloqueBarrera{
    constructor(ID){
        this._ID = ID;
    }

    get getID(){
        return this._ID;
    }
    eliminar(){

    }
    esDestructible(){
        return false;
    }
    espacioLibre(){
        return false;
    }
    esObjetivo(){
        return false;
    }
}