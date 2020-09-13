const knex = require('../../../knex/knex.js');
const Errormsg = require('../../errmsg.js');

const getAnimal = async (req, res, next)=>{
  try {
    var animal = await knex('animals').where({id: req.params.id});
    res.status(200).json(animal);
  } catch (error) {
    Errormsg(error, res);
  }
}
module.exports = getAnimal;