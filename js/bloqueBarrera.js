/**
 * Created by Josue on 10/11/2017.
 */
class bloqueBarrera{
    constructor(parteLogica){
        this._coordinador = parteLogica;
        this._ID = this._coordinador.BORDE;
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