/**
 * Created by Josue on 01/11/2017.
 */


/***
 * Hace referencia los espacios restantes que no sean: bloques, tankes, objetivos
 * En caso de que un elemento vaya a estar sobre laa posición en la que se encuentre este objeto, se elimina este objeto
 * y se agrega el nuevo objeto
 * */

class espacioLibre{
    constructor(parteLogica){
        this._coordinador = parteLogica;
        this._ID = this._coordinador.EMPTYSPACE;
    }
    get getID(){
        return this._ID;
    }

    esDestructible(){
        return false;
    }
    esObjetivo(){
        return false;
    }
    espacioLibre(){
        return true;
    }
}
