var fs = require('fs');
var respuestas = [];
var nombreArchivo = 'pokemon/data.json';
var contenido = fs.readFileSync(nombreArchivo, 'utf-8');
respuestas = JSON.parse(contenido);
/*****  Ejericcio 1 ****/
var ejercicio1 = { tipo: [] };
var ejercicio2 = { abilities: [] };
var ejercicio3 = { move: [] };
var ejercicio4 = { nombre: [], pokemons: [] };
var ejercicio5 = { nombre: [], pokemons: [] };
respuestas.forEach(function (value) {
    value.types.forEach(function (value2) {
        ejercicio1.tipo.push(value2.type.name);
    });
});
//console.log('**************** Ejericio1 ************************')
//console.log(ejercicio1)
/*****  Ejericcio 2 ****/
respuestas.forEach(function (value) {
    value.abilities.forEach(function (value2) {
        ejercicio2.abilities.push(value2.ability.name);
    });
});
//console.log('*************** Ejericio2 ******************')
//console.log(ejercicio2)
/********  Ejericcio 3 *******/
respuestas.filter(function (value) {
    value.moves.filter(function (value2) {
        ejercicio3.move.push(value2.move.name);
    });
});
//console.log('***************** Ejericio3 *****************')
//console.log(ejercicio3)
/********  Ejericcio 4 ******/
respuestas.forEach(function (value) {
    value.types.forEach(function (value2) {
        ejercicio1.tipo.forEach(function (valor) {
            //ejercicio4.nombre.push(valor)
            if (value2.type.name === valor) {
                ejercicio4.pokemons.push(value.id);
            }
        });
    });
});
console.log(ejercicio4);
/********  Ejericcio 5 ******/
respuestas.forEach(function (value) {
    value.abilities.forEach(function (value2) {
        ejercicio2.abilities.forEach(function (valor) {
            ejercicio5.nombre.push(valor);
            if (value2.abilities.name === valor) {
                ejercicio5.pokemons.push(value.id);
            }
        });
    });
});
console.log(ejercicio5);
