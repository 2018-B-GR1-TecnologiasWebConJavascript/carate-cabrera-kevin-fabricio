declare var require;
declare var Promise;
const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;

/************** PREGUNTAS CONSOLA **************/

const preguntasMenuMusica = {
    type: 'list',
    name: 'opcionMenuMusica',
    message: 'Que quieres hacer',
    choices: [
        'Agregar',
        'Borrar',
        'Actualizar',
        'Listar',
    ]
};

const preguntasUsuarioRegistro = [
    {
        type: 'input',
        name: 'id',
        message: 'Cual es tu id'
    },
    {
        type: 'input',
        name: 'nick',
        message: 'Ingresa tu nick'
    },
    {
        type: 'password',
        name: 'pass',
        message: 'ingresa tu pass',
        mask: '*'
    },
];


const preguntasCancionIngreso = [
    {
        type: 'input',
        name: 'idCancion',
        message: 'Ingresa el id de la canción'
    },
    {
        type: 'input',
        name: 'nombre',
        message: 'Ingresa el nombre de la canción'
    },
    {
        type: 'input',
        name: 'artista',
        message: 'Ingresa el nombre del artista de la canción'
    }
];

const preguntaBorrarCancion = [
    {
        type: 'input',
        name: 'idCancion',
        message: 'ingrese el id de la cancion a borrar'
    }
]

const preguntaActualizarCancion = [
    {
        type: 'input',
        name: 'nombreActual',
        message: 'ingrese el nombre de la cancion a modificar'
    },
    {
        type: 'input',
        name: 'nombreNuevo',
        message: 'ingrese el nombre de la cancion nueva'
    }
]

const preguntaListarCancion = {
    type: 'input',
    name:'artista',
    message: 'De enter para listar todas las canciones'
}

/************** INICIALIZAR BASE **************/

function inicializarBase() {

    const bddLeida$ = rxjs.from(leerBDD());

    return bddLeida$
        .pipe(
            mergeMap(  // Respuesta anterior Observable
                (respuestaBDD: RespuestaLeerBDD) => {
                    if (respuestaBDD.bdd) {
                        return rxjs.of(respuestaBDD);
                    } else {
                        // crear la base
                        return rxjs.from(crearBDD());
                    }

                }
            ),
        );
}

/************** CREAR BASE **************/

function crearBDD() {
    const contenido = '{"usuarios":[],"canciones":[]}';
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                'bdd.json',
                contenido,
                (error) => {
                    if (error) {
                        reject({
                            mensaje: 'Error creando bdd',
                            error: 500
                        });
                    } else {
                        resolve({
                            mensaje: 'BDD creada',
                            bdd: JSON.parse(contenido)
                        });
                    }
                }
            );
        }
    );
}

/************** LEER BASE **************/

function leerBDD() {
    return new Promise(
        (resolve) => {
            fs.readFile(
                'bdd.json',
                'utf-8',
                (error, contenidoArchivo) => {
                    if (error) {
                        resolve({
                            mensaje: 'No existe la Base de Datos',
                            bdd: null
                        });
                    } else {
                        resolve({
                            mensaje: 'Base de datos leida',
                            bdd: JSON.parse(contenidoArchivo)
                        });
                    }
                }
            );
        }
    );
}

/************** GUARDAR BASE **************/

function guardarBDD(bdd: BaseDeDatos) {
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                'bdd.json',
                JSON.stringify(bdd),
                (err) => {
                    if (err) {
                        reject({
                            mensaje: 'Error guardando la BDD',
                            error: 500
                        });
                    } else {
                        resolve({
                            mensaje: 'BDD guardada',
                            bdd
                        });
                    }
                }
            );
        }
    );
}

/************** MAIN-EJECUCION **************/

function  main() {
    console.log('Inicio Programa')

    inicializarBase()
        .pipe(
            preguntarOpcionesMenu(),
            preguntarDatosMusica(),
        )
        .subscribe(
        )
}

/************** OPCIONES MENU PRINCIPAL **************/
function preguntarOpcionesMenu() {
    return mergeMap(
        (respuesta: RespuestaLeerBDD) => {
            return rxjs
                .from(inquirer.prompt(preguntasMenuMusica))
                .pipe(
                    map(
                        (opcionMenu: OpcionMenuMusica) => {
                            respuesta.opcionMenuMusica = opcionMenu;
                            return respuesta;
                        }
                    ),
                )
        }
    );
}

function preguntarDatosMusica() {
    return mergeMap(
        (respuesta: RespuestaLeerBDD) => {
            switch (respuesta.opcionMenuMusica.opcionMenuMusica) {
                case 'Agregar':
                    return rxjs
                        .from(inquirer.prompt(preguntasCancionIngreso))
                        .pipe(
                            map(
                                (cancion: cancion) => {
                                    respuesta.cancion = cancion;
                                    return respuesta;
                                }
                            )
                        ).pipe(
                            ingresarCancion(),
                            actualizarBDD(),
                        )

                case 'Borrar':

                    return rxjs
                        .from(inquirer.prompt(preguntaBorrarCancion))
                        .pipe(
                            map(
                                (cancion: cancion) => {
                                    respuesta.cancion = cancion;
                                    return respuesta;
                                }
                            )
                        ).pipe(

                            borrarCancion(),
                            actualizarBDD(),
                        )

                case 'Actualizar':

                    return rxjs
                        .from(inquirer.prompt(preguntaActualizarCancion))
                        .pipe(
                            map(
                                (cancion: cancionActualizar) => {
                                    respuesta.cancionActualizar = cancion;
                                    return respuesta;
                                }
                            )
                        ).pipe(
                            updateCancion(),
                            actualizarBDD(),
                        )

                case 'Listar':

                    return rxjs
                        .from(inquirer.prompt(preguntaListarCancion))
                        .pipe(
                            map(
                                (cancion: cancion) => {
                                    respuesta.cancion = cancion;
                                    return respuesta;
                                }
                            )
                        ).pipe(
                            listarCancion(),
                        )
            }
        }
    );
}

/************ METODOS **************/

function ingresarCancion() {

    return map(
        (respuesta: RespuestaLeerBDD) => {
            respuesta.bdd.canciones.push(respuesta.cancion);
            return respuesta;
        }
    )
}

function actualizarBDD() {
    return map(
        (respuesta: RespuestaLeerBDD) => {
            return rxjs.from(guardarBDD(respuesta.bdd));
        }
    );
}

function borrarCancion() {

    return map(
        (respuesta: RespuestaLeerBDD) => {
            respuesta.bdd.canciones.splice(respuesta.cancion.idCancion - 1,1);
            return respuesta;
        }
    )
}

function updateCancion() {
    return map(
        (respuesta: RespuestaLeerBDD) => {
            respuesta.bdd.canciones.forEach((valor) => {
                if(valor.nombre === respuesta.cancionActualizar.nombreActual){
                    valor.nombre = respuesta.cancionActualizar.nombreNuevo;
                }
            })

            return respuesta
        }
    )
}

function listarCancion(){
    return map(
        (respuesta: RespuestaLeerBDD) => {
            return respuesta.bdd.canciones.forEach((value)=>{
                console.log("canción\n" +
                    "\tnombre: " + value.nombre + "\n" +
                    "\tartista: " + value.artista)
            })
        }
    )
}

main();

/************** INTERFACES **************/

interface BaseDeDatos {
    usuarios: Usuario[];
    canciones: cancion[];
}

interface Usuario {
    id?:number,
    nick: string,
    pass: string,
}

interface cancion {
    idCancion?:number,
    nombre?:string,
    artista?:string,
}

interface cancionActualizar {
    nombreActual?:string,
    nombreNuevo?:string,
}

interface RespuestaLeerBDD {
    mensaje: string;
    bdd?: BaseDeDatos;
    opcionMenuMusica?: OpcionMenuMusica;
    cancion?: cancion;
    cancionActualizar?:cancionActualizar;
}

interface OpcionMenuMusica {
    opcionMenuMusica: 'Agregar' | 'Borrar' | 'Actualizar' | 'Listar';
}