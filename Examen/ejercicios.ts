declare var Promise;
declare var require;
const fs = require('fs');
var respuestas = [];
const nombreArchivo = 'pokemon/data.json';

const contenido = fs.readFileSync(nombreArchivo, 'utf-8');
respuestas = JSON.parse(contenido)

/*****  Ejericcio 1 ****/

const ejercicio1 = {tipo:[]}
const ejercicio2 = {abilities:[]}
const ejercicio3 = {move:[]}
const ejercicio4 = {nombre:[],pokemons:[]}
const ejercicio5 = {nombre:[],pokemons:[]}

interface tipo{
    "tipo":String
}

respuestas.forEach((value) => {
    value.types.forEach((value2) => {
        ejercicio1.tipo.push(value2.type.name)
    })
})
//console.log('**************** Ejericio1 ************************')
//console.log(ejercicio1)



/*****  Ejericcio 2 ****/
respuestas.forEach((value) => {
    value.abilities.forEach((value2) => {
         ejercicio2.abilities.push(value2.ability.name)
    })
})

//console.log('*************** Ejericio2 ******************')
//console.log(ejercicio2)


/********  Ejericcio 3 *******/

respuestas.filter((value)=>{
    value.moves.filter((value2)=>{
        ejercicio3.move.push(value2.move.name)
    })
})

//console.log('***************** Ejericio3 *****************')
//console.log(ejercicio3)


/********  Ejericcio 4 ******/
respuestas.forEach((value) => {
    value.types.forEach((value2) => {
        ejercicio1.tipo.forEach(
            (valor) =>{
                //ejercicio4.nombre.push(valor)
                if(value2.type.name === valor){
                    ejercicio4.pokemons.push(value.id)
                }
            }
        )

    })
})

console.log(ejercicio4)

/********  Ejericcio 5 ******/

respuestas.forEach((value) => {
    value.abilities.forEach((value2) => {
        ejercicio2.abilities.forEach(
            (valor) =>{
                ejercicio5.nombre.push(valor)
                if(value2.abilities.name === valor){
                    ejercicio5.pokemons.push(value.id)
                }
            }
        )

    })
})

console.log(ejercicio5)














