/**
 * RazaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  holaMundo: function (peticion, respuesta) {
    return respuesta.ok('ok');
  },
  buscarPorNombre: async function (req, res) {
    // TENER ACCESO A TODOS LOS MODELOS
    // Body Query
    const parametros = req.allParams();

    var nombreCac = await Raza.find({
      nombre: {'startsWith': parametros.nombre}
    });

    return res.ok(nombreCac);

  },


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

