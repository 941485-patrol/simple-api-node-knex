// const serializeAnimal = require('./serializeAnimal');
// const Errormsg = require('../../errmsg');
// const pageAnimals = require('./pageAnimals');
// const searchAnimals = require('./searchAnimals');
// const sortAnimals = require('./sortAnimals');
const knex = require('../../../knex/knex.js');
const getAnimals = async (req, res, next)=>
  {
    try {
      var animals = await knex('animals').select();
      res.status(200).json(animals);
    } catch (error) {
      console.log(error);
    }
  }
module.exports = getAnimals;