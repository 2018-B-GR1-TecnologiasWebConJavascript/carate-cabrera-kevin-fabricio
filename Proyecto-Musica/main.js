var inquirer = require('inquirer');
var fs = require('fs');
var rxjs = require('rxjs');
var mergeMap = require('rxjs/operators').mergeMap;
var map = require('rxjs/operators').map;
/************** PREGUNTAS CONSOLA **************/
var preguntasMenuMusica = {
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
var preguntasUsuarioRegistro = [
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
var preguntasCancionIngreso = [
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
var preguntaBorrarCancion = [
    {
        type: 'input',
        name: 'idCancion',
        message: 'ingrese el id de la cancion a borrar'
    }
];
var preguntaActualizarCancion = [
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
];
var preguntaListarCancion = {
    type: 'input',
    name: 'artista',
    message: 'De enter para listar todas las canciones'
};
/************** INICIALIZAR BASE **************/
function inicializarBase() {
    var bddLeida$ = rxjs.from(leerBDD());
    return bddLeida$
        .pipe(mergeMap(// Respuesta anterior Observable
    function (respuestaBDD) {
        if (respuestaBDD.bdd) {
            return rxjs.of(respuestaBDD);
        }
        else {
            // crear la base
            return rxjs.from(crearBDD());
        }
    }));
}
/************** CREAR BASE **************/
function crearBDD() {
    var contenido = '{"usuarios":[],"canciones":[]}';
    return new Promise(function (resolve, reject) {
        fs.writeFile('bdd.json', contenido, function (error) {
            if (error) {
                reject({
                    mensaje: 'Error creando bdd',
                    error: 500
                });
            }
            else {
                resolve({
                    mensaje: 'BDD creada',
                    bdd: JSON.parse(contenido)
                });
            }
        });
    });
}
/************** LEER BASE **************/
function leerBDD() {
    return new Promise(function (resolve) {
        fs.readFile('bdd.json', 'utf-8', function (error, contenidoArchivo) {
            if (error) {
                resolve({
                    mensaje: 'No existe la Base de Datos',
                    bdd: null
                });
            }
            else {
                resolve({
                    mensaje: 'Base de datos leida',
                    bdd: JSON.parse(contenidoArchivo)
                });
            }
        });
    });
}
/************** GUARDAR BASE **************/
function guardarBDD(bdd) {
    return new Promise(function (resolve, reject) {
        fs.writeFile('bdd.json', JSON.stringify(bdd), function (err) {
            if (err) {
                reject({
                    mensaje: 'Error guardando la BDD',
                    error: 500
                });
            }
            else {
                resolve({
                    mensaje: 'BDD guardada',
                    bdd: bdd
                });
            }
        });
    });
}
/************** MAIN-EJECUCION **************/
function main() {
    console.log('Inicio Programa');
    inicializarBase()
        .pipe(preguntarOpcionesMenu(), preguntarDatosMusica())
        .subscribe();
}
/************** OPCIONES MENU PRINCIPAL **************/
function preguntarOpcionesMenu() {
    return mergeMap(function (respuesta) {
        return rxjs
            .from(inquirer.prompt(preguntasMenuMusica))
            .pipe(map(function (opcionMenu) {
            respuesta.opcionMenuMusica = opcionMenu;
            return respuesta;
        }));
    });
}
function preguntarDatosMusica() {
    return mergeMap(function (respuesta) {
        switch (respuesta.opcionMenuMusica.opcionMenuMusica) {
            case 'Agregar':
                return rxjs
                    .from(inquirer.prompt(preguntasCancionIngreso))
                    .pipe(map(function (cancion) {
                    respuesta.cancion = cancion;
                    return respuesta;
                })).pipe(ingresarCancion(), actualizarBDD());
            case 'Borrar':
                return rxjs
                    .from(inquirer.prompt(preguntaBorrarCancion))
                    .pipe(map(function (cancion) {
                    respuesta.cancion = cancion;
                    return respuesta;
                })).pipe(borrarCancion(), actualizarBDD());
            case 'Actualizar':
                return rxjs
                    .from(inquirer.prompt(preguntaActualizarCancion))
                    .pipe(map(function (cancion) {
                    respuesta.cancionActualizar = cancion;
                    return respuesta;
                })).pipe(updateCancion(), actualizarBDD());
            case 'Listar':
                return rxjs
                    .from(inquirer.prompt(preguntaListarCancion))
                    .pipe(map(function (cancion) {
                    respuesta.cancion = cancion;
                    return respuesta;
                })).pipe(listarCancion());
        }
    });
}
/************ METODOS **************/
function ingresarCancion() {
    return map(function (respuesta) {
        respuesta.bdd.canciones.push(respuesta.cancion);
        return respuesta;
    });
}
function actualizarBDD() {
    return map(function (respuesta) {
        return rxjs.from(guardarBDD(respuesta.bdd));
    });
}
function borrarCancion() {
    return map(function (respuesta) {
        respuesta.bdd.canciones.splice(respuesta.cancion.idCancion - 1, 1);
        return respuesta;
    });
}
function updateCancion() {
    return map(function (respuesta) {
        respuesta.bdd.canciones.forEach(function (valor) {
            if (valor.nombre === respuesta.cancionActualizar.nombreActual) {
                valor.nombre = respuesta.cancionActualizar.nombreNuevo;
            }
        });
        return respuesta;
    });
}
function listarCancion() {
    return map(function (respuesta) {
        return respuesta.bdd.canciones.forEach(function (value) {
            console.log("canción\n" +
                "\tnombre: " + value.nombre + "\n" +
                "\tartista: " + value.artista);
        });
    });
}
main();
