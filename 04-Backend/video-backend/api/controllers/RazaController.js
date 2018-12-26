/**
 * RazaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  hola:(peticion, respuesta) => {
    return respuesta.ok['ok'];
  }

};

// Estandar RESTFULL
// modelo Raza

// Find ->
// http://localhost:1337/Raza
// Metodo HTTP: GET


// Create ->
// http://localhost:1337/Raza
// Metodo HTTP: POST
// Parametros


// Update
// http://localhost:1337/Raza/id
// Metodo HTTP: PUT
// Parametros


// Delete
// http://localhost:1337/Raza/id
// Metodo HTTP: DELETE


// Find One

