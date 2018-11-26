"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
exports.escribirarchivo = function (nombreArchivo, contenidoArchivo) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(nombreArchivo, contenidoArchivo, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve(contenidoArchivo);
            }
        });
    });
};
exports.lecturaArchivo = function (nombreArchivo) {
    return new Promise(function (resolve, reject) {
        fs.readFile(nombreArchivo, 'utf-8', function (err, contenidoArchivo) {
            if (err) {
                reject(err);
            }
            else {
                resolve(contenidoArchivo);
            }
        });
    });
};
