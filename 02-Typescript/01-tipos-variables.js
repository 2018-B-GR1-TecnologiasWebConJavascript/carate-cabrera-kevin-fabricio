// 01-tipos-variables.ts
let edad = 23;
edad = 23;
edad = 'Kevin';
let variableLoca = '';
variableLoca = false;
let nombre = 'Kevin';
// duck typing ->
let casado = false;
casado = true;
casado = null;
casado = undefined;
let kevin = {
    nombre: 'Kevin',
    apellido: 'Carate'
};
let fechaNacimiento = new Date();
/*
let promesa:Promise<number> = () => {
    return new Promise(
        (resolve, reject) => {
            resolve(1);
        }
        );
}
*/
const numeros = [1, 2, 3, 4];
/****** TIPAR FUNCIONES *******/
function saludar(nombre, //Requeridos
apellido, //Opcionales
...otrosNombres) {
    return '';
}
let respuestaSaludar = saludar('Kevin', 'Carate', '', '', '');
respuestaSaludar = 1;
/*******  Funciones Anonimas *******/
const saludo = (nombre) => {
    return 1;
};
/***** Clases e Interfaces *****/
class Usuario {
    constructor() {
    }
}
const kevin = new Usuario(); // Instanciar
class UsuarioDummy {
}
const kevin = {
    nombre: 'Kevin',
    apellido: 'Carate'
};
const kevin = {
    nombre: 'Kevin',
    apellido: 'Carate'
};
