/**
 * BoardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  saludo: (req, res) => {
    const parametros = req.allParams();

    return res.ok({
      saludo: `Hola ${parametros.saludo} son las ${new Date().toDateString()}`
    })

  }

};
