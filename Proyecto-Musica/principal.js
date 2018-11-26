"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer = require('inquirer');
var service = require('./servicios');
var rxjs = require('rxjs');
var arreglo = [];
var choices1 = [];
var choices2 = [];
var menuPrincipal = {
    type: 'list',
    name: 'menuPrincipal',
    message: 'Que quieres hacer',
    choices: [
        'Ingresar',
        'Registrarse',
    ]
};
var menuMusica = {
    type: 'list',
    name: 'menuCancion',
    message: 'Que quieres hacer',
    choices: [
        'Agregar',
        'Borrar',
        'Actualizar',
        'Listar',
    ]
};
var preguntaUsuarioRegistro = [
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
var preguntaUsuario = [
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
var canciones = [
    {
        type: 'list',
        name: 'canciones',
        message: 'elige una cancion',
        choices: choices1
    }
];
var cancionEliminada = [
    {
        type: 'list',
        name: 'cancionEli',
        message: 'elige una cancion',
        choices: choices2
    }
];
var arregloCanciones = rxjs.from(service.lecturaArchivo("archivos/listaCanciones.txt"));
arregloCanciones.subscribe(function (res) {
    var arr = res.split('\r');
    arr.forEach(function (value) {
        choices1.push(JSON.parse(value)["nombre"]);
    });
});
function main() {
    inquirer.prompt(menuPrincipal).then(function (opcionEscogida) {
        switch (opcionEscogida.menuPrincipal) {
            case 'Ingresar':
                inquirer
                    .prompt(preguntaUsuario)
                    .then(function (respuestas) {
                    var leerArchivo$ = rxjs.from(service.lecturaArchivo("archivos/cuentas.txt"));
                    leerArchivo$.subscribe(function (respuesta) {
                        arreglo = respuesta.split('\n');
                        var id = arreglo.filter(function (value) {
                            return (JSON.parse(value)["nick"] === respuestas.nick && JSON.parse(value)["pass"] === respuestas.pass);
                        });
                        if (id.length != 0 && JSON.parse("id")["id"] != 0) {
                            llamadaMenuCancion(JSON.parse("id")["id"]);
                        }
                        else {
                            console.log("usuario no encontrado");
                            main();
                        }
                    });
                });
                break;
            case 'Registrarse':
                inquirer.prompt(preguntaUsuarioRegistro)
                    .then(function (respuestas) {
                    var leerArchivo$ = rxjs.from(service.lecturaArchivo("archivos/cuentas.txt"));
                    leerArchivo$.subscribe(function (respuesta) {
                        rxjs.from(service.escribirarchivo("archivos/cuentas.txt", respuesta + '\n' + JSON.stringify(respuestas)));
                        main();
                    });
                });
                break;
        }
    });
}
main();
function llamadaMenuCancion(idUsuario) {
    inquirer.prompt(menuMusica).then(function (opcionEscogida) {
        switch (opcionEscogida.menuCancion) {
            case 'Agregar':
                inquirer.prompt(canciones).then(function (cancionEscogida) {
                    var leerArchivo$ = rxjs.from(service.lecturaArchivo("archivos/listaResproduccion.txt"));
                    leerArchivo$.subscribe(function (respuesta) {
                        var lista;
                        lista = { idUser: idUsuario, cancion: cancionEscogida.canciones };
                        rxjs.from(service.escribirarchivo("archivos/listaResproduccion.txt", respuesta + '\n' + JSON.stringify(lista)));
                        llamadaMenuCancion(idUsuario);
                    });
                });
                break;
            case 'Borrar':
                var leerArchivo$ = rxjs.from(service.lecturaArchivo("archivos/listaResproduccion.txt"));
                leerArchivo$.subscribe(function (respuesta) {
                    arreglo = respuesta.split('\n');
                    var id = arreglo.filter(function (value) {
                        if (value != '') {
                            return (JSON.parse(value)["idUser"] === idUsuario);
                        }
                    });
                    if (id.length != 0) {
                        id.forEach(function (valor) {
                            choices2.push(JSON.parse(valor)["cancion"]);
                        });
                    }
                    inquirer
                        .prompt(cancionEliminada)
                        .then(function (opcion) {
                        var leerArchivo2$ = rxjs.from(service.lecturaArchivo("archivos/listaResproduccion.txt"));
                        leerArchivo2$.subscribe(function (respuesta2) {
                            var arreglo2 = respuesta2.split('\n');
                            arreglo2 = arreglo2.filter(function (value) {
                                if (value === '') {
                                }
                                else {
                                    if (JSON.parse(value)["cancion"] === opcion.cancionEli && JSON.parse(value)["idUser"] === idUsuario) {
                                    }
                                    else {
                                        return value;
                                    }
                                }
                            });
                            var val = "";
                            arreglo2.forEach(function (valor) {
                                val += valor + "\n";
                            });
                            console.log(val);
                            rxjs.from(service.escribirarchivo("archivos/listaResproduccion.txt", val));
                            //llamadaMenuCancion(idUsuario);
                        });
                    });
                });
                break;
            case 'Actualizar':
                var leerArchivo$ = rxjs.from(service.lecturaArchivo("archivos/listaResproduccion.txt"));
                leerArchivo$.subscribe(function (respuesta) {
                    arreglo = respuesta.split('\n');
                    var id = arreglo.filter(function (value) {
                        if (value != '') {
                            return (JSON.parse(value)["idUser"] === idUsuario);
                        }
                    });
                    if (id.length != 0) {
                        id.forEach(function (valor) {
                            choices2.push(JSON.parse(valor)["cancion"]);
                        });
                    }
                    inquirer
                        .prompt(cancionEliminada)
                        .then(function (opcion) {
                        inquirer
                            .prompt(canciones)
                            .then(function (cambioCancion) {
                            id = id.filter(function (value) {
                                return (JSON.parse(value)['cancion'] != opcion.cancionEli);
                            });
                            var lista;
                            lista = { idUser: idUsuario, cancion: cambioCancion.canciones };
                            var val = "";
                            id.forEach(function (valor) {
                                val += valor + "\n";
                            });
                            rxjs.from(service.escribirarchivo("archivos/listaResproduccion.txt", val + '\n' + JSON.stringify(lista)));
                            llamadaMenuCancion(idUsuario);
                        });
                    });
                });
                break;
            case 'Listar':
                var leerArchivo$ = rxjs.from(service.lecturaArchivo("archivos/listaResproduccion.txt"));
                leerArchivo$.subscribe(function (respuesta) {
                    arreglo = respuesta.split('\n');
                    var id = arreglo.filter(function (value) {
                        if (value != '') {
                            return (JSON.parse(value)["idUser"] === idUsuario);
                        }
                    });
                    if (id.length != 0) {
                        id.forEach(function (valor) {
                            console.log(JSON.parse(valor)["cancion"]);
                        });
                        llamadaMenuCancion(idUsuario);
                    }
                });
                break;
        }
    });
}
