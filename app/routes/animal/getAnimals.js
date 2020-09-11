// const serializeAnimal = require('./serializeAnimal');
// const Errormsg = require('../../errmsg');
// const pageAnimals = require('./pageAnimals');
// const searchAnimals = require('./searchAnimals');
// const sortAnimals = require('./sortAnimals');
const knex = require('../../../knex/knex.js');
const getAnimals = async (req, res, next)=>
  {
    try {
      var x = 'nIm'
      var perPage = 5;
      var page = req.query.page == undefined ? 1 : req.query.page;
      var pageSkip = parseInt(page) - parseInt(1);
      var animals = await knex('animals')
        .select('animals.*', 'status.name AS statName')
        .leftJoin('status', 'animals.status_id', 'status.id')
        .where('animals.name', 'ilike', `%${x}%`)
        .limit(perPage).offset(pageSkip*perPage)
        .orderBy('animals.id');
      res.status(200).json(animals);
    } catch (error) {
      console.log(error);
    }
  }
module.exports = getAnimals;