class Tank{
    constructor(ID,parteLogica,x,y,o,v) {
        this._ID = ID;
        this._coordinador = parteLogica;
        this._posX = x;
        this._posY = y;
        this._orientacion = o;
        this._vidas = v;
        this._parteLogica = parteLogica;
    }
    get getID() {
        return this._ID;
    }
    set setID(value) {
        this._ID = value;
    }
    get getCoordinador(){
        return this._coordinador;
    }
    set setCoordinador(c){
        this._coordinador = c;
    }
    get getParteLogica() {
        return this._parteLogica;
    }
    set setParteLogica(value) {
        this._parteLogica = value;
    }
    get getPosX() {
        return this._posX;
    }
    set setPosX(value) {
        this._posX = value;
    }
    get getPosY() {
        return this._posY;
    }
    set setPosY(value) {
        this._posY = value;
    }
    get getOrientacion() {
        return this._orientacion;
    }
    set setOrientacion(value) {
        this._orientacion = value;
    }
    get getVidas() {
        return this._vidas;
    }
    set setVidas(value) {
        this._vidas = value;
    }}