declare var Promise;
declare var require;
const fs = require('fs');

export var escribirarchivo = function (nombreArchivo, contenidoArchivo) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(nombreArchivo, contenidoArchivo,
            function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(contenidoArchivo);
                }
            });
    });
};

export var lecturaArchivo = function (nombreArchivo) {
    return new Promise(function (resolve, reject) {
        fs.readFile(nombreArchivo, 'utf-8',function (err, contenidoArchivo) {
            if (err) {
                reject(err);
            }
            else {
                resolve(contenidoArchivo);
            }
        });
    });
};