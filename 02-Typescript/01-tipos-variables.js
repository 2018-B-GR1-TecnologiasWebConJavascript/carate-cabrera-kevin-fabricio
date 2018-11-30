// 01-tipos-variables.ts
var edad = 23;
edad = 23;
edad = 'Kevin';
var variableLoca = '';
variableLoca = false;
var nombre = 'Kevin';
// duck typing ->
var casado = false;
casado = true;
casado = null;
casado = undefined;
var kevin = {
    nombre: 'Kevin',
    apellido: 'Carate'
};
var fechaNacimiento = new Date();
/*
let promesa:Promise<number> = () => {
    return new Promise(
        (resolve, reject) => {
            resolve(1);
        }
        );
}
*/
var numeros = [1, 2, 3, 4];
/****** TIPAR FUNCIONES *******/
function saludar(nombre, //Requeridos
apellido) {
    var otrosNombres = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        otrosNombres[_i - 2] = arguments[_i];
    }
    return '';
}
var respuestaSaludar = saludar('Kevin', 'Carate', '', '', '');
respuestaSaludar = 1;
/*******  Funciones Anonimas *******/
var saludo = function (nombre) {
    return 1;
};
/***** Clases e Interfaces *****/
var Usuario = /** @class */ (function () {
    function Usuario() {
    }
    return Usuario;
}());
var kevin = new Usuario(); // Instanciar
var UsuarioDummy = /** @class */ (function () {
    function UsuarioDummy() {
    }
    return UsuarioDummy;
}());
var kevin = {
    nombre: 'Kevin',
    apellido: 'Carate'
};
var kevin = {
    nombre: 'Kevin',
    apellido: 'Carate'
};
