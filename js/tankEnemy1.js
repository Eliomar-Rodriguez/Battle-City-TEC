/**
 * Created by Josue on 31/10/2017.
 * TIENE 1 VIDA PERO SE MUEVE RAPIDO
 */
class tankEnemy1 extends Tank{
    constructor(x,y,velocidad,parteLogica,id){
        super(id, parteLogica, x, y, Math.floor((Math.random() * 4) + 1) - 1);
        this._velocidadTanke = velocidad;
    }
    get getID(){
        return this._ID;
    }
    get getOrientacion(){
        return this._orientacion;
    }
    set setOrientacion(orientacion){
        this._orientacion = orientacion;
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
    get getEstadoVida(){
        return this._estadoVida;
    }
    set setEstadoVida(value){
        this._estadoVida = value;
    }
    get getVidaTotal(){
        return this._vidaTotal
    }
    set setVidaTotal(value){
        this._vidaTotal = value;
    }
    get getVelocidadTanke(){
        return this._velocidadTanke;
    }
    set setVelocidadTanke(value){
        this._velocidadTanke = value;
    }
    esDestructible(){
        return true;
    }
    espacioLibre(){
        return false;
    }
    esObjetivo(){
        return true;
    }
    eliminar(){
        this._coordinador.setObject(this._posX,this._posY,new espacioLibre(this._coordinador));
        this._coordinador.borrarEnemigo(this,0);
    }
}
