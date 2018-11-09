//02-observables.ts

declare var require: any;



const rxjs = require('rxjs');
const map = require('rxjs/operators').map;
const distinct = require('rxjs/operators').distinct;
const concat = require('rxjs/operators').concat;

const numeros$ = rxjs.of(
    1,
    'Kevin',
    true,
    'Kevin',
    1,
    {nombre:'kevin'},
    [1,2,3],
    1);

console.log(numeros$);

const promesita = (correcto) => {
    return new Promise(
        (resolve,reject) => {
            if(correcto){
                resolve(':)')
            }
            else {
                reject(':(')
            }
        }
    )
}


const promesitaNoOk$ = rxjs.from(promesita(false));
const promesitaOk$ = rxjs.from(promesita(true));

/*
promesita$
    .subscribe(
        (ok)=>{
            console.log('En promesita', ok);
        },
        (error)=> {
            console.log('error en promesita', error);
        },
        ()=>{
            console.log('completado')
        }
    )
*/

numeros$
    .pipe(
        concat(promesitaNoOk$),
        concat(promesitaOk$)
    )
    .pipe(
        distinct(),
        map(
            (valorActual)=>{
            return {
                data:valorActual
                };
            }
        )
    )
    .subscribe(
    (ok)=>{
        console.log('En ok', ok);
    },
    (error)=>{
        console.log('Error', error);
    },
    ()=>{
        console.log('Completado');
    }
);

