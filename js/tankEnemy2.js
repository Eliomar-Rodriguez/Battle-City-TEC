/**
 * Created by Josue on 31/10/2017.
 * SOPORTA 3 BALAZOS DEL TANKE HEROE PERO SE MUEVE LENTO
 */
class tankEnemy2 extends Tank{
    constructor(x,y,vidaTotal,parteLogica,id){
        super(id, parteLogica, x, y, Math.floor((Math.random() * 4) + 1) - 1);
        this._resistencia = vidaTotal;
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
    get getResistencia(){
        return this._resistencia;
    }
    set setResistencia(value){
        this._resistencia = value;
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
        this._resistencia--;
        if(this._resistencia == 0){
            this._coordinador.setObject(this._posX,this._posY,new espacioLibre(this._coordinador));
            this._coordinador.borrarEnemigo(this,1);
            muerteEnemy.play();
        }
    }
}
