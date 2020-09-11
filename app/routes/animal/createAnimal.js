const Animal = require('../../models/animal');
const Type = require('../../models/type');
const Status = require('../../models/status');
const Errormsg = require('../../errmsg');
const knex = require('../../../knex/knex.js');
const createAnimal = async (req, res, next ) => {
  try {
    res.status(200).json({"message": "Animal created"});
  } catch (error) {
    Errormsg(error, res);
  }
}
module.exports = createAnimal;