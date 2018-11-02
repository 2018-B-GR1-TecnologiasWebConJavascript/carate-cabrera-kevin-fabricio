// ['A','B','C']

// 0-A.txt    'A'
// 1-B.txt    'B'
// 2-C.txt    'C'

const fs = require('fs');

const respuesta = {
    nombreArchivo: '',
    contenidoArchivo: '',
    error: '',
};

const ejercicio2 = (arregloStrings) => {
    return new Promise(
        (resolve, reject) => {

            const respuestas = [];

            arregloStrings
                .forEach(
                    (string, indice) => {
                        const nombreArchivo = `${indice}-${string}.txt`;
                        const contenido = string;
                        fs.writeFile(
                            nombreArchivo,
                            contenido,
                            (err) => {
                                const respuesta = {
                                    nombreArchivo: nombreArchivo,
                                    contenidoArchivo: contenido,
                                    error: err,
                                };
                                respuestas.push(respuesta);

                                const estaCompletoElArreglo = respuestas.length === arregloStrings.length;

                                if (estaCompletoElArreglo) {
                                    resolve(respuestas);
                                }

                            }
                        );
                    }
                )
        }
    );

}


ejercicio2(['A1', 'B1', 'C1'])
    .then(
        (respuestaEjercicio) => {
            console.log(respuestaEjercicio);
        }
    )
    .catch(
        (error) => {
            console.log('Catch',error);
        }
    );