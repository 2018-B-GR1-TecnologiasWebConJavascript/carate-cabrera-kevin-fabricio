/**
 * RaspberryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const axios = require('axios');


module.exports = {

  saludo: async (req, res) => {
    const parametros = req.allParams();

    const url = 'http://localhost:1338/board/saludo';

    const saludo = {
      saludo: parametros.saludo
    };

    try {
      const respuestaRaspberry = await axios.post(url, saludo);

      return res.ok(respuestaRaspberry);

    } catch (e) {

      return res.serverError({
        error: 500,
        mensaje: 'Error en el servidor'
      });

    }


  }

};

