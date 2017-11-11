/**
 * Created by Josue on 10/11/2017.
 */

var tamMatriz = 15; var cantidadMaxBloques = 50; var totalObjetivos = 2; var totalEnemigos = 3;  var cantidadEnemigosVivos = 3;
this.nivelActual = 1;
/*-----------------------VARIABLES NECESARIAS-----------------------------------------------*/
var ARRIBA = 0; var ABAJO = 1; var IZQUIERDA = 2; var DERECHA = 3;//DIRECCIONES POSIBLES PARA MOVERSE

var BORDE = 0; var BLOQUENORMAL = 1; var EMPTYSPACE = 2; var OBJETIVO = 3;
var HEROE = 4; var ENEMY = 5; var BULLET = 6;//PARA DIBUJAR - ID'S PARA CADA CLASE

var BALAHEROE = 0;  var BALAENEMIGO = 1;//BALAS PARA CADA TIPO DE TANKE

var matrizLogica = new Array(tamMatriz);//SE GENERA UN ARREGLO NORMAL -> [] <-

var heroe;//INSTANCIA DEL HEROE GLOBAL
var tankesEnemigos = [];//ALMACENA LOS TANKES ENEMIGOS CREADOS

/*--------------------------MÉTODOS IMPORTANTES----------------------------------------------*/
/*PERMITE GENERAR LA MATRIZ LÓGICA CON LA QUE SE TRABAJARÁ*/
function crearMatriz() {
    /*AGREGA LOS OBJETO ESPACIOS LIBRES Y BLOQUE BARRERA*/
    for(var x = 0; x < tamMatriz; x++){
        matrizLogica[x] = new Array(tamMatriz);//SE HACE ASÍ PARA PODER CREAR UNA MATRIZ DIMENSIONAL -> [][] <-
        for(var y = 0; y < tamMatriz; y++){
            if(x == tamMatriz -1 || y == tamMatriz - 1 || x == 0 || y == 0){
                matrizLogica[x][y] = new bloqueBarrera(BORDE); //SE CREA UN ELEMENTO BARRERA
            }
            else{
                matrizLogica[x][y] = new espacioLibre(EMPTYSPACE);//LOS DEMÁS ELEMENTOS SERÁN ESPACIOS VACÍOS
            }
        }
    }

    /*PERMITE CREAR LOS BLOQUES DESTRUCTIBLES*/
    while(cantidadMaxBloques > 0){
        var posX; var posY;
        posX = generarPosicionAleatoria();
        posY = generarPosicionAleatoria();//SE GENERAN POSICIONES AL AZAR ENTRE 0 Y 10(TAMAÑO MATRIZ)
        if(posX != 0 && posX != tamMatriz-1 && posY != 0 && posY != tamMatriz-1
            && matrizLogica[posX][posY].espacioLibre()){
            matrizLogica[posX][posY] = new bloque(posX,posY,this); //SE AGREGA EL OBJETO BLOQUE
            cantidadMaxBloques--;
        }
    }
    /*SE CREA EL HEROE Y SE COLOCA EN LA MATRIZ*/
    heroe = new tankHeroe(7,13,this);
    matrizLogica[7][13] = heroe;
    return matrizLogica;
}
/*OBTIENE UNA POSICIÓN ENTRE 1 Y 14*/
function generarPosicionAleatoria(){
    return Math.floor((Math.random() * 14) + 1);
}

/*PERMITE ESTAR CAMBIANDO CONSTANTEMENTE POSICIONES DENTRO DE LA MATRIZ Y ASIGNANDO NUEVOS OBJETOS*/
function setObject(posX,posY,objetoNuevo){
    matrizLogica[posX][posY] = objetoNuevo;
}
/*EXTRAE EL OBJETO QUE ESTÁ EN UNA POSICIÓN [X,Y]*/
function getObject(posX,posY) {
    return this.matrizLogica[posX][posY];
}

/*PERMITE CREAR LAS BALAS*/
function disparar(posX,posY,pertenece,orientacion) {
    this.setObject(posX,posY,new bala(posX,posY,orientacion,pertenece,this));
    this.matrizLogica[posX][posY].run();//SE ACTIVA EL HILO PARA QUE LA BALA SE PUEDA MOVER SOLA
    this.actualizar();
}
/*PERMITE ACTUALIZAR LA MATRIZ GRÁFICA A PARTIR DE LA MATRIZ LÓGICA*/
function actualizar(){
    var canvas = document.getElementById('scene');
    var context = canvas.getContext('2d');

    for(x = 0;x<tamMatriz;x++){

        for(var y=0;y<tamMatriz;y++){debugger;
            if(matrizLogica[x][y].getID == EMPTYSPACE){
                context.drawImage(document.getElementById('empty'), x*47, y*47);
            }
            if(matrizLogica[x][y].getID == BORDE){
                context.drawImage(document.getElementById('borde'), x*47, y*47);
            }
            if(matrizLogica[x][y].getID == BLOQUENORMAL){
                context.drawImage(document.getElementById('bloque'), x*47, y*47);
            }
            if(matrizLogica[x][y].getID == OBJETIVO){
                context.drawImage(document.getElementById('objetivo1'), x*47, y*47);
            }
            if(this.matrizLogica[x][y].getID == HEROE){
                switch (matrizLogica[x][y].getOrientacion){
                    case 2://IZQUIERDA
                        context.drawImage(document.getElementById('heroeLeft'), x*47, y*47);
                        break;
                    case 0://ARRIBA
                        context.drawImage(document.getElementById('heroeUp'), x*47, y*47);
                        break;
                    case 1://ABAJO
                        context.drawImage(document.getElementById('heroeDown'), x*47, y*47);
                        break;
                    case 3://DERECHA
                        context.drawImage(document.getElementById('heroeRight'), x*47, y*47);
                        break;
                }
            }
            if(matrizLogica[x][y].getID == BULLET){
                context.drawImage(document.getElementById('bala'), x*47, y*47);
            }
        }
    }
}

crearMatriz();
actualizar();


/*PERMITE MOVER EL HEROE*/
document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 32://BARRA ESPACIADORA
            heroe.disparar();
            break;
        case 37://IZQUIERDA
            heroe.moverHeroe(2);
            break;
        case 38://ARRIBA
            heroe.moverHeroe(0);
            break;
        case 39://DERECHA
            heroe.moverHeroe(3);
            break;
        case 40://ABAJO
            heroe.moverHeroe(1);
            break;
    }
};
