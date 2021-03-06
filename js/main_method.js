/*
* Metodo principal de donde inicia el juego
*
* Juego desarrollado como proyecto, para dicho proyecto era necesaria la creacion
* Desarrolladores:
*   - Josue Arce
*   - Eliomar Rodriguez
* Estudiantes del ITCR Sede San Carlos
* Curso: Lenguajes de Programacion
* Año: 2017
* */

var intervalo;
var hiloEnemy1, hiloEnemy2y3, hiloBalasEnemy1;
var EnemyList2y3 = [], EnemyList1 = [], bulletList = []; var disparoEnemigo;
var refreshPantalla;
var finJuego = false;

/*
* audios que se usan a lo largo del juego
* */

var destruir = new Audio(reprMusica(1));
destruir.loop = false;

var disparo = new Audio(reprMusica(2));
disparo.loop = false;

var game_over = new Audio(reprMusica(3));
game_over.loop = false;

var juegoNormal = new Audio(reprMusica(4));
juegoNormal.loop = true;

var muerteEnemy = new Audio(reprMusica(5));
muerteEnemy.loop = false;

var muerteHeroe = new Audio(reprMusica(6));
muerteHeroe.loop = false;

var muerteObjeto = new Audio(reprMusica(7));
muerteObjeto.loop = false;

var pasoNivel = new Audio(reprMusica(8));
pasoNivel.loop = false;

var inicio = new Audio(reprMusica(9));
inicio.loop = false;

var disparoAHeroe = new Audio(reprMusica(10));
disparoAHeroe.loop = false;

var balaPared = new Audio(reprMusica(11));
balaPared.loop = false;


var tiempo = 0; var countDown;

var tamMatriz = 15; var cantidadMaxBloques = 50; var totalObjetivos = 2; var totalEnemigos = 3;  var cantidadEnemigosVivos = 0;
var nivelActual = 1; var totalVidasHeroe = 3;
/*-----------------------VARIABLES NECESARIAS-----------------------------------------------*/
var ARRIBA = 0; var ABAJO = 1; var IZQUIERDA = 2; var DERECHA = 3;//DIRECCIONES POSIBLES PARA MOVERSE

this.BORDE = 0; this.BLOQUENORMAL = 1; this.EMPTYSPACE = 2; this.OBJETIVO1 = 3; this.OBJETIVO2 = 9;
this.HEROE = 4; this.ENEMY1 = 5; this.BULLET = 6;//PARA DIBUJAR - ID'S PARA CADA CLASE
this.ENEMY2 = 7; this.ENEMY3 = 8;
var BALAHEROE = 0;  var BALAENEMIGO = 1;//BALAS PARA CADA TIPO DE TANKE

var matrizLogica = new Array(tamMatriz);//SE GENERA UN ARREGLO NORMAL -> [] <-

var heroe;//INSTANCIA DEL HEROE GLOBAL
var tankesEnemigos = [];//ALMACENA LOS TANKES ENEMIGOS CREADOS

/*--------------------------MÉTODOS IMPORTANTES----------------------------------------------*/
/*PERMITE GENERAR LA MATRIZ LÓGICA CON LA QUE SE TRABAJARÁ*/
function crearMatriz() {
    let posX; let posY;
    /*AGREGA LOS OBJETO ESPACIOS LIBRES Y BLOQUE BARRERA*/
    for(let x = 0; x < tamMatriz; x++){
        matrizLogica[x] = new Array(tamMatriz);//SE HACE ASÍ PARA PODER CREAR UNA MATRIZ DIMENSIONAL -> [][] <-
        for(let y = 0; y < tamMatriz; y++){
            if(x === tamMatriz -1 || y === tamMatriz - 1 || x === 0 || y === 0)
                setObject(x,y, new bloqueBarrera(this)); //SE CREA UN ELEMENTO BARRERA
            else
                setObject(x,y,new espacioLibre(this));//LOS DEMÁS ELEMENTOS SERÁN ESPACIOS VACÍOS
        }
    }

    /*PERMITE CREAR LOS BLOQUES DESTRUCTIBLES*/
    while(cantidadMaxBloques > 0){
        posX = generarPosicionAleatoria();
        posY = generarPosicionAleatoria();//SE GENERAN POSICIONES AL AZAR ENTRE 0 Y 10(TAMAÑO MATRIZ)
        if(getObject(posX,posY).espacioLibre()){
           setObject(posX,posY,new bloque(posX,posY,this)); //SE AGREGA EL OBJETO BLOQUE
            cantidadMaxBloques--;
        }
    }
    /*SE CREA EL HEROE Y SE COLOCA EN LA MATRIZ*/
    heroe = new tankHeroe(7,13,this);
    setObject(7,13,heroe);

    /*CREAR OBJETIVOS*/
    let objetivo1Usado = false; let objetivo2Usado = false;
    while(totalObjetivos>0){
        posX = generarPosicionAleatoria();
        posY = generarPosicionAleatoria();
        if(getObject(posX,posY).espacioLibre()){
            if(!objetivo1Usado){
                setObject(posX,posY,new objetivos(posX,posY,this,OBJETIVO1,1));
                objetivo1Usado=true;
                totalObjetivos--;
            }
            else if(!objetivo2Usado){
                setObject(posX,posY,new objetivos(posX,posY,this,OBJETIVO2,2));
                objetivo2Usado=true;
                totalObjetivos--;
            }
        }
    }
    totalObjetivos = 2;
    document.getElementById("txtObjetivos").textContent = totalObjetivos;

    /*CREAR ENEMIGOS LA PRIMERA VEZ*/
    let usoEnemy1 = false; let usoEnemy2 = false; let usoEnemy3 = false;
    while(totalEnemigos > 0){
        posX = generarPosicionAleatoria();
        posY = generarPosicionAleatoria();
        if(getObject(posX,posY).espacioLibre()){
            if(!usoEnemy1){
                setObject(posX,posY,new tankEnemy1(posX,posY,1,this,ENEMY1));
                EnemyList1.push(getObject(posX,posY));
                usoEnemy1=true;
            }
            else if(!usoEnemy2){
                setObject(posX,posY,new tankEnemy2(posX,posY,3,this,ENEMY2));
                EnemyList2y3.push(getObject(posX,posY));
                usoEnemy2=true;
            }
            else if(!usoEnemy3){
                setObject(posX,posY,new tankEnemy3(posX,posY,this,ENEMY3,2));
                EnemyList2y3.push(getObject(posX,posY));
                usoEnemy3=true;
            }
            totalEnemigos--;
        }
    }
    totalEnemigos=3;
    document.getElementById("txtTanksEnemy").textContent = totalEnemigos;
    return matrizLogica;
}

/*OBTIENE UNA POSICIÓN ENTRE 1 Y 14*/
function generarPosicionAleatoria(){
    return Math.floor((Math.random() * 14) + 1);
}

/*RESTA UNO DEL TOTAL DE OBJETIVOS VIVOS*/
function restarObjetivos() {
    totalObjetivos--;
    document.getElementById("txtObjetivos").textContent = totalObjetivos;
}

/*PERMITE REINICIAR EL JUEGO CUANDO SE PASE DE NIVEL*/
function reiniciarJuego() {
    timer();
    EnemyList1=[];EnemyList2y3=[];
    cantidadMaxBloques = 50;
    totalObjetivos = 2;
    matrizLogica = new Array(tamMatriz);
    totalEnemigos=3;
    crearMatriz();
    clearInterval(countDown);

}

function terminarJuego(estado) {
    if(estado){
        swal(
            'Good job!',
            'Has Ganado!',
            'success'
        );
        pasoNivel.play();
    }
    else{
        swal(
            'Good Luck Next Time!',
            'Has Perdido!',
            'error'
        );
        game_over.play();
        muerteHeroe.pause();
    }
    clearInterval(countDown);
    document.getElementById("txtVidas").textContent = 0;
    juegoNormal.pause();
    finJuego = true;
    clearInterval(hiloEnemy1);
    clearInterval(hiloEnemy2y3);
    clearInterval(intervalo);
}

/*
* funcion encargada de la reproduccion de canciones o audios del juego
* */
function reprMusica(opcion) {
    let audio;
    switch (opcion){
        case 1:
            audio = "sounds/destruirBloque.ogg";
            break;
        case 2:
            audio = "sounds/disparo.wav";
            break;
        case 3:
            audio = "sounds/game_over.ogg";
            break;
        case 4:
            audio = "sounds/juegoNormal.wav";
            break;
        case 5:
            audio = "sounds/muerteEnemy.wav";
            break;
        case 6:
            audio = "sounds/muerteHeroe.wav";
            break;
        case 7:
            audio = "sounds/muerteObjetivo.wav";
            break;
        case 8:
            audio = "sounds/pasoNivel.wav";
            break;
        case 9:
            audio = "sounds/stage_start.ogg";
            break;
        case 10:
            audio = "sounds/disparoAHeroe.wav";
            break;
        case 11:
            audio = "sounds/choquePared.wav";
            break;
    }
    return audio;
}

/*PERMITE SABER EN QUE NIVEL SE ENCUENTRA EL JUGADOR, EN CASO DE QUE HAYA TERMINADO EL NIVEL 3 SE TERMINA EL JUEGO*/
function verificarEstadoJuego() {debugger;
    if(totalObjetivos===0){
        if(nivelActual === 1){
            nivelActual = 2;
            swal(
                'Good job!',
                'Avanzas al Nivel 2!',
                'success'
            );
            document.getElementById("txtNivel").textContent = nivelActual;
            reiniciarJuego();
        }
        else if(nivelActual === 2){
            nivelActual = 3;
            swal(
                'Good job!',
                'Avanzas al Nivel 3!',
                'success'
            );
            document.getElementById("txtNivel").textContent = nivelActual;
            reiniciarJuego();
        }
        else if(nivelActual === 3){
            terminarJuego(true);
        }
    }
}

/*PERMITE ESTAR CAMBIANDO CONSTANTEMENTE POSICIONES DENTRO DE LA MATRIZ Y ASIGNANDO NUEVOS OBJETOS*/
function setObject(posX,posY,objetoNuevo){
    matrizLogica[posX][posY] = objetoNuevo;
}

/*EXTRAE EL OBJETO QUE ESTÁ EN UNA POSICIÓN [X,Y]*/
function getObject(posX,posY) {
    return matrizLogica[posX][posY];
}

/*PERMITE CREAR LAS BALAS*/
function disparar(posX,posY,pertenece,orientacion) {
    if (orientacion === ARRIBA) {
        if (getObject(posX,posY-1)._ID === EMPTYSPACE) {
            setObject(posX, posY - 1, new bala(posX, posY - 1, orientacion, pertenece, this));
            getObject(posX,posY-1).run();
        }
        else if (getObject(posX,posY-1)._ID === BLOQUENORMAL) {
            setObject(posX, posY - 1, new espacioLibre(this));
            destruir.play();
        }
        else if(
            getObject(posX,posY-1)._ID === ENEMY1 ||
            getObject(posX,posY-1)._ID === ENEMY2 ||
            getObject(posX,posY-1)._ID === ENEMY3 ||
            getObject(posX,posY-1)._ID === OBJETIVO1 ||
            getObject(posX,posY-1)._ID === OBJETIVO2)
        {
            getObject(posX,posY-1).eliminar();
        }
        else{
            balaPared.play();
        }
    }
    else if (orientacion === ABAJO) {
        if (getObject(posX,posY+1)._ID === EMPTYSPACE) {
            setObject(posX, posY + 1, new bala(posX, posY + 1, orientacion, pertenece, this));
            getObject(posX,posY+1).run();
        }
        else if (getObject(posX,posY+1)._ID === BLOQUENORMAL) {
            setObject(posX, posY + 1, new espacioLibre(this));
            destruir.play();
        }
        else if(
            getObject(posX,posY+1)._ID === ENEMY1 ||
            getObject(posX,posY+1)._ID === ENEMY2 ||
            getObject(posX,posY+1)._ID === ENEMY3 ||
            getObject(posX,posY+1)._ID === OBJETIVO1 ||
            getObject(posX,posY+1)._ID === OBJETIVO2)
        {
            getObject(posX,posY+1).eliminar();
        }
        else{
            balaPared.play();
        }
    }
    else if (orientacion === IZQUIERDA) {
        if (getObject(posX-1,posY)._ID === EMPTYSPACE) {
            setObject(posX - 1, posY, new bala(posX - 1, posY, orientacion, pertenece, this));
            getObject(posX-1,posY).run();
        }
        else if (getObject(posX-1,posY)._ID === BLOQUENORMAL) {
            setObject(posX - 1, posY, new espacioLibre(this));
            destruir.play();
        }
        else if(
            getObject(posX-1,posY)._ID === ENEMY1 ||
            getObject(posX-1,posY)._ID === ENEMY2 ||
            getObject(posX-1,posY)._ID === ENEMY3 ||
            getObject(posX-1,posY)._ID === OBJETIVO1 ||
            getObject(posX-1,posY)._ID === OBJETIVO2
        ){
            getObject(posX-1,posY).eliminar();
        }
        else{
            balaPared.play();
        }
    }
    else if (orientacion === DERECHA) {
        if (getObject(posX+1,posY)._ID === EMPTYSPACE) {
            setObject(posX + 1, posY, new bala(posX + 1, posY, orientacion, pertenece, this));
            getObject(posX+1,posY).run();
        }
        else if (getObject(posX+1,posY)._ID === BLOQUENORMAL) {
            setObject(posX + 1, posY, new espacioLibre(this));
            destruir.play();
        }
        else if(
            getObject(posX+1,posY)._ID === ENEMY1 ||
            getObject(posX+1,posY)._ID === ENEMY2 ||
            getObject(posX+1,posY)._ID === ENEMY3 ||
            getObject(posX+1,posY)._ID === OBJETIVO1 ||
            getObject(posX+1,posY)._ID === OBJETIVO2
        ){
            getObject(posX+1,posY).eliminar();
        }
        else{
            balaPared.play();
        }
    }
}

function borrarEnemigo(tanke,estado) {
    if(estado === 1){
        for(item in EnemyList2y3){
            if(tanke === EnemyList2y3[item]){
                EnemyList2y3.splice(item,1);
            }
        }
    }
    else{
        for(item in EnemyList1){
            if(tanke === EnemyList1[item]){
                EnemyList1.splice(item,1);
            }
        }
    }
    totalEnemigos--;
    document.getElementById("txtTanksEnemy").textContent = totalEnemigos;
}

function sleep(milliseconds) {
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

/*OBTIENE EL OBJETO DE TIPO HEROE*/
function getHeroe() {
    return heroe;
}

/*PERMITE ACTUALIZAR LA MATRIZ GRÁFICA A PARTIR DE LA MATRIZ LÓGICA*/
function actualizar(){
    let canvas = document.getElementById('scene');
    let context = canvas.getContext('2d');

    for(let x = 0;x<tamMatriz;x++){
        for(let y=0;y<tamMatriz;y++){
            if(getObject(x,y).getID === EMPTYSPACE){
                context.drawImage(document.getElementById('empty'), x*47, y*47);
            }
            else if(getObject(x,y).getID === BORDE){
                context.drawImage(document.getElementById('borde'), x*47, y*47);
            }
            else if(getObject(x,y).getID === BLOQUENORMAL){
                context.drawImage(document.getElementById('bloque'), x*47, y*47);
            }
            else if(getObject(x,y).getID === OBJETIVO1 ){
                context.drawImage(document.getElementById('Objetivo1'), x*47, y*47);
            }
            else if(getObject(x,y).getID === OBJETIVO2){
                context.drawImage(document.getElementById('Objetivo2'), x*47, y*47);
            }
            else if(getObject(x,y).getID === HEROE){
                switch (getObject(x,y).getOrientacion){
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
            else if(getObject(x,y).getID === BULLET){
                context.drawImage(document.getElementById('bala'), x*47, y*47);
            }
            else if(getObject(x,y).getID === ENEMY1){
                switch (getObject(x,y).getOrientacion){
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
            else if(getObject(x,y).getID === ENEMY2){
                switch (getObject(x,y).getOrientacion){
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
            else if(getObject(x,y).getID === ENEMY3){
                switch (getObject(x,y).getOrientacion){
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

/*CREA UN NUEVO ENEMIGO*/
function addNewEnemy(){
    let posX = generarPosicionAleatoria();
    let posY = generarPosicionAleatoria();
    let tankType = Math.floor((Math.random() * 3) + 1); // numero random (1, 2, 3)
    if(getObject(posX,posY).espacioLibre()){//BARRERA
        if(tankType === 1)
        {
            setObject(posX,posY, new tankEnemy1(posX,posY,1,this,ENEMY1));// listo
            EnemyList1.push(getObject(posX,posY));
        }
        else if(tankType === 2){
            setObject(posX,posY, new tankEnemy2(posX,posY,3,this, ENEMY2));
            EnemyList2y3.push(getObject(posX,posY));
        }
        else{
            setObject(posX,posY, new tankEnemy3(posX,posY, this,ENEMY3,2));
            EnemyList2y3.push(getObject(posX,posY));
        }
        totalEnemigos++;
        document.getElementById("txtTanksEnemy").textContent = totalEnemigos;
    }
    else{
        addNewEnemy();
    }
}

/*PERMITE EJECUTAR EL TEMPORIZADOR, EMPIEZA EN 2:00 MINUTOS*/
function startTimer(duracion, objeto) {
    let timer = duracion, minutos, segundos;
    countDown =setInterval(function () {
        minutos = parseInt(timer / 60, 10);
        segundos = parseInt(timer % 60, 10);

        minutos = minutos < 10 ? "0" + minutos : minutos;
        segundos = segundos < 10 ? "0" + segundos : segundos;

        objeto.textContent = minutos + ":" + segundos;

        if (--timer < 0) {
            timer = duracion;
        }
    }, 1000);

}

function quitarBalasMatriz(tanke) {
    for(let x = 0; x < tamMatriz; x++){
        for(let y = 0; y < tamMatriz; y++){
            if(getObject(x,y).getID === tanke){
                setObject(x,y,new espacioLibre(this));
                sleep(50);
            }
        }
    }
}

/*PERMITE MOVER EL HEROE*/
document.onkeydown = function (e) {
    if(!finJuego){
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
    }
};

/*CREA EL TEMPORIZADOR*/
function timer() {
    tiempo = 60 * 2;//SE INICIALIZA EL TIMER
    startTimer(tiempo, document.getElementById("txtTiempo"));//SE LLAMA LA FUNCIÓN PARA CREAR EL TIMER
}

function dispararEnemigo(posX,posY,pertenece,orientacion) {
    if(orientacion === ARRIBA){
        posY--;
    }
    else if(orientacion === ABAJO){
        posY++;
    }
    else if(orientacion === DERECHA){
        posX++;
    }
    else if(orientacion === IZQUIERDA){
        posX--;
    }
    if(getObject(posX,posY)._ID !== BLOQUENORMAL && getObject(posX,posY)._ID !== BORDE &&
       getObject(posX,posY)._ID !== OBJETIVO1 && getObject(posX,posY)._ID !== OBJETIVO2 &&
       getObject(posX,posY)._ID !== ENEMY1 && getObject(posX,posY)._ID !== ENEMY2 && getObject(posX,posY)._ID !== ENEMY3
       && getObject(posX,posY)._ID !== EMPTYSPACE){
        getObject(posX,posY).eliminar();
    }
}

function buscarHeroe(orientacion,posX,posY) {debugger;
    let result = false;
    if(orientacion === ARRIBA){
        for(let x = 0;x <tamMatriz;x++){
            for(let y =0;y<tamMatriz;y++){
                posY--;
                if(posY > 0 && getObject(posX,posY)._ID === HEROE){
                    result = true;
                }
            }
        }
    }
    else if(orientacion === ABAJO){
        for(let x = 0;x <tamMatriz;x++){
            for(let y =0;y<tamMatriz;y++){
                posY++;
                if(posY < tamMatriz-1 && getObject(posX,posY)._ID === HEROE){
                    result = true;
                }
            }
        }
    }
    else if(orientacion === IZQUIERDA){
        for(let x = 0;x <tamMatriz;x++){
            for(let y =0;y<tamMatriz;y++){
                posX--;
                if(posX > 0 && getObject(posX,posY)._ID === HEROE){
                    result = true;
                }
            }
        }
    }
    else if(orientacion === DERECHA){
        for(let x = 0;x <tamMatriz;x++){
            for(let y =0;y<tamMatriz;y++){
                posX++;
                if(posX < tamMatriz-1 &&  getObject(posX,posY)._ID === HEROE){
                    result = true;
                }
            }
        }
    }
    return result;
}

/*INICIAR JUEGO*/
crearMatriz();
inicio.play();

window.onload= function () {
    timer();
    juegoNormal.play();

    hiloEnemy1 = setInterval(function () {
        for(let i = 0; i < EnemyList1.length;i++){
            EnemyList1[i].run();
            EnemyList1[i].dispararEnemy();
        }
    },300); // los enemigos se mueven y disparan cada 0.3 segundos

    hiloEnemy2y3 = setInterval(function () {
        for(let i = 0; i < EnemyList2y3.length;i++){
            EnemyList2y3[i].run();
            EnemyList1[i].dispararEnemy();
        }
    },900); // los enemigos se mueven y disparan cada 0.9 segundos

    disparoEnemigo = setInterval(function () {
        for(let i = 0; i < EnemyList2y3.length;i++){
            EnemyList2y3[i].dispararEnemy();
        }
        for(let i = 0; i < EnemyList1.length;i++){
            EnemyList1[i].dispararEnemy();
        }
    },100); // se mantiene atento si el heroe está en el camino de algun tanque enemigo

    intervalo = setInterval(addNewEnemy, 15000); // actualiza enemigos cada 15 segundos
    refreshPantalla = setInterval(actualizar,60); // actualiza la ventana de juego cada 0.06 segundos

};
