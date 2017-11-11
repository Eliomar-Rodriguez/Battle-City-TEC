/**
 * Created by Josue on 10/11/2017.
 */

var intervalo;

var tamMatriz = 15; var cantidadMaxBloques = 50; var totalObjetivos = 2; var totalEnemigos = 3;  var cantidadEnemigosVivos = 3;
this.nivelActual = 1;
/*-----------------------VARIABLES NECESARIAS-----------------------------------------------*/
var ARRIBA = 0; var ABAJO = 1; var IZQUIERDA = 2; var DERECHA = 3;//DIRECCIONES POSIBLES PARA MOVERSE

this.BORDE = 0; this.BLOQUENORMAL = 1; this.EMPTYSPACE = 2; this.OBJETIVO = 3;
this.HEROE = 4; this.ENEMY1 = 5; this.BULLET = 6;//PARA DIBUJAR - ID'S PARA CADA CLASE
this.ENEMY2 = 7; this.ENEMY3 = 8;
var BALAHEROE = 0;  var BALAENEMIGO = 1;//BALAS PARA CADA TIPO DE TANKE

var matrizLogica = new Array(tamMatriz);//SE GENERA UN ARREGLO NORMAL -> [] <-

var heroe;//INSTANCIA DEL HEROE GLOBAL
var tankesEnemigos = [];//ALMACENA LOS TANKES ENEMIGOS CREADOS

var intervalo;

/*--------------------------MÉTODOS IMPORTANTES----------------------------------------------*/
/*PERMITE GENERAR LA MATRIZ LÓGICA CON LA QUE SE TRABAJARÁ*/
function crearMatriz() {
    /*AGREGA LOS OBJETO ESPACIOS LIBRES Y BLOQUE BARRERA*/
    for(var x = 0; x < tamMatriz; x++){
        matrizLogica[x] = new Array(tamMatriz);//SE HACE ASÍ PARA PODER CREAR UNA MATRIZ DIMENSIONAL -> [][] <-
        for(var y = 0; y < tamMatriz; y++){
            if(x == tamMatriz -1 || y == tamMatriz - 1 || x == 0 || y == 0){
                matrizLogica[x][y] = new bloqueBarrera(this); //SE CREA UN ELEMENTO BARRERA
            }
            else{
                matrizLogica[x][y] = new espacioLibre(this);//LOS DEMÁS ELEMENTOS SERÁN ESPACIOS VACÍOS
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

function activarHilo(posX,posY) {debugger;
    if(!matrizLogica[posX][posY].estadoBala){
        clearInterval(intervalID);
    }
    matrizLogica[posX][posY].moverBala();
}
/*PERMITE CREAR LAS BALAS*/
function disparar(posX,posY,pertenece,orientacion) {
    //debugger;
    if(orientacion == this.ARRIBA){
        if (this.matrizLogica[posX][posY-1]._ID == this.EMPTYSPACE){
            this.setObject(posX,posY-1,new bala(posX,posY -1,orientacion,pertenece,this));
            //Concurrent.Thread.create();
            matrizLogica[posX][posY-1].run();
        }
        else if (this.matrizLogica[posX][posY-1]._ID == this.BLOQUENORMAL){
            debugger;
            setObject(posX,posY-1,new espacioLibre(this));
        }
    }
    else if(orientacion == this.ABAJO){
        if (this.matrizLogica[posX][posY+1]._ID == this.EMPTYSPACE){
            this.setObject(posX,posY+1,new bala(posX,posY +1,orientacion,pertenece,this));
            this.matrizLogica[posX][posY+1].run();
        }
        else if(this.matrizLogica[posX][posY+1]._ID == this.BLOQUENORMAL){
            this.setObject(posX,posY+1,new espacioLibre(this));
        }
    }
    else if(orientacion == this.IZQUIERDA){
        if (this.matrizLogica[posX-1][posY]._ID == this.EMPTYSPACE){
            this.setObject(posX-1,posY,new bala(posX-1,posY,orientacion,pertenece,this));
            this.matrizLogica[posX-1][posY].run();
        }
        else if(this.matrizLogica[posX-1][posY]._ID == this.BLOQUENORMAL){
            this.setObject(posX-1,posY,new espacioLibre(this));
        }
    }
    else if(orientacion == this.DERECHA){
        if (this.matrizLogica[posX+1][posY]._ID == this.EMPTYSPACE){
            this.setObject(posX+1,posY,new bala(posX+1,posY,orientacion,pertenece,this));
            this.matrizLogica[posX+1][posY].run();
        }
        else if(this.matrizLogica[posX+1][posY]._ID == this.BLOQUENORMAL){
            this.setObject(posX+1,posY,new espacioLibre(this));
        }
    }
    this.actualizar();
};
/*PERMITE ACTUALIZAR LA MATRIZ GRÁFICA A PARTIR DE LA MATRIZ LÓGICA*/
function actualizar(){
    var canvas = document.getElementById('scene');
    var context = canvas.getContext('2d');

    for(x = 0;x<tamMatriz;x++){

        for(var y=0;y<tamMatriz;y++){
            if(matrizLogica[x][y].getID == this.EMPTYSPACE){
                context.drawImage(document.getElementById('empty'), x*47, y*47);
            }
            else if(matrizLogica[x][y].getID == this.BORDE){
                context.drawImage(document.getElementById('borde'), x*47, y*47);
            }
            if(matrizLogica[x][y].getID == this.BLOQUENORMAL){
                context.drawImage(document.getElementById('bloque'), x*47, y*47);
            }
            if(matrizLogica[x][y].getID == this.OBJETIVO){
                context.drawImage(document.getElementById('objetivo1'), x*47, y*47);
            }
            if(this.matrizLogica[x][y].getID == this.HEROE){
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
            if(matrizLogica[x][y].getID == this.BULLET){
                context.drawImage(document.getElementById('bala'), x*47, y*47);
            }
            if(this.matrizLogica[x][y].getID == this.ENEMY1){
                debugger;
                console.log(matrizLogica[x][y].getOrientacion);
                switch (matrizLogica[x][y].getOrientacion){
                    case 2://IZQUIERDA
                        context.drawImage(document.getElementById('enemy1Left'), x*47, y*47);
                        break;
                    case 0://ARRIBA
                        context.drawImage(document.getElementById('enemy1Up'), x*47, y*47);
                        break;
                    case 1://ABAJO
                        context.drawImage(document.getElementById('enemy1Down'), x*47, y*47);
                        break;
                    case 3://DERECHA
                        context.drawImage(document.getElementById('enemy1Right'), x*47, y*47);
                        break;
                }
            }
            if(this.matrizLogica[x][y].getID == this.ENEMY2){
                debugger;
                console.log(matrizLogica[x][y].getOrientacion);
                switch (matrizLogica[x][y].getOrientacion){
                    case 2://IZQUIERDA
                        context.drawImage(document.getElementById('enemy2Left'), x*47, y*47);
                        break;
                    case 0://ARRIBA
                        context.drawImage(document.getElementById('enemy2Up'), x*47, y*47);
                        break;
                    case 1://ABAJO
                        context.drawImage(document.getElementById('enemy2Down'), x*47, y*47);
                        break;
                    case 3://DERECHA
                        context.drawImage(document.getElementById('enemy2Right'), x*47, y*47);
                        break;
                }
            }
            if(this.matrizLogica[x][y].getID == this.ENEMY3){
                debugger;
                console.log(matrizLogica[x][y].getOrientacion);
                switch (matrizLogica[x][y].getOrientacion){
                    case 2://IZQUIERDA
                        context.drawImage(document.getElementById('enemy3Left'), x*47, y*47);
                        break;
                    case 0://ARRIBA
                        context.drawImage(document.getElementById('enemy3Up'), x*47, y*47);
                        break;
                    case 1://ABAJO
                        context.drawImage(document.getElementById('enemy3Down'), x*47, y*47);
                        break;
                    case 3://DERECHA
                        context.drawImage(document.getElementById('enemy3Right'), x*47, y*47);
                        break;
                }
            }
        }
    }
}

function addNewEnemy() {
    var posX = this.generarPosicionAleatoria();
    var posY = this.generarPosicionAleatoria();
    var tankType = Math.floor((Math.random() * 3) + 1); // numero random (1, 2, 3)
    if(posX != 0 && posX != this.tamMatriz-1 && posY != 0 && posY != this.tamMatriz-1 && matrizLogica[posX][posY].getID == this.EMPTYSPACE){//BARRERA
        if(tankType == 1)
            this.setObject(posX,posY, new tankEnemy(posX,posY,3,tankType,this,5));
        else if(tankType == 2)
            this.setObject(posX,posY, new tankEnemy(posX,posY,2,tankType,this, 7));
        else
            this.setObject(posX,posY, new tankEnemy(posX,posY,1,tankType,this, 8));
        this.cantidadEnemigosVivos++;
        actualizar();
    }
    else{
        this.addNewEnemy();
    }
}
crearMatriz();
actualizar();


/*PERMITE MOVER EL HEROE*/
document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 32://BARRA ESPACIADORA
            debugger;
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

window.onload= function () {
    debugger;
    intervalo = setInterval(addNewEnemy, 1000);
};