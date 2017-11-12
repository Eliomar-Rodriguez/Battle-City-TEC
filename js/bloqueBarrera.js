
class bloqueBarrera{
    constructor(parteLogica){
        this._coordinador = parteLogica;
        this._ID = this._coordinador.BORDE;
    }

    get getID(){
        return this._ID;
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