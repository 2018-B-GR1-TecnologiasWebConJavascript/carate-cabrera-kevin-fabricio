// 01-tipos-variables.ts

let edad:number | string= 23;
edad = 23;
edad = 'Kevin';

let variableLoca: any = '';
variableLoca = false;

let nombre = 'Kevin';
// duck typing ->


let casado = false;
casado = true;
casado = null;
casado = undefined;


let kevin:{//Interface
    nombre:string;
    apellido?:string;

} = {//JSON
    nombre: 'Kevin',
    apellido: 'Carate'
};

let fechaNacimiento:Date = new Date();
/*
let promesa:Promise<number> = () => {
    return new Promise(
        (resolve, reject) => {
            resolve(1);
        }
        );
}
*/

const numeros:number[] = [1,2,3,4];


/****** TIPAR FUNCIONES *******/

function saludar(
    nombre:string,     //Requeridos
    apellido?:string,  //Opcionales
    ...otrosNombres: string[]): any{ //Inifitos

    return '';
}


let respuestaSaludar = <number> saludar('Kevin', 'Carate', '','','');
respuestaSaludar = 1;

/*******  Funciones Anonimas *******/

const saludo = (nombre:string):number => {
    return 1;
}

/***** Clases e Interfaces *****/

class Usuario {
    edad:number;
    nombre:any;
    constructor(){

    }
}

const kevin = new Usuario(); // Instanciar

interface UsuarioInterface {
    nombre:string;
    apellido?:string;
}

class UsuarioDummy{
    nombre:string;
    apellido?:string;
}

const kevin:UsuarioInterface = {
    nombre:'Kevin',
    apellido: 'Carate'
}

const kevin:UsuarioDummy = {
    nombre:'Kevin',
    apellido: 'Carate'
}