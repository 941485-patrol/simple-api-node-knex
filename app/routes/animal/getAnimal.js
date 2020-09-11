const knex = require('../../../knex/knex.js');

const getAnimal = async (req, res, next)=>{
  try {
    var animal = await knex('animals').where({id: req.params.id});
    res.status(200).json(animal);
  } catch (error) {
    console.log(error);
  }
}
module.exports = getAnimal;