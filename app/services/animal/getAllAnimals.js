const pageAnimals = require('./pageAnimals');
const searchAnimals = require('./searchAnimals');
const sortAnimals = require('./sortAnimals');
const getAllAnimalsRepo = require('../../repositories/animal/getAllAnimals');
const getAllAnimals = function(req){
    var searchee = searchAnimals(req);
    var perPage = 5;
    var page = pageAnimals(req);
    var pageSkip = parseInt(page) - parseInt(1);
    var sort = sortAnimals(req);
    var animals = getAllAnimalsRepo(searchee, perPage, page, pageSkip, sort);
    return animals;
}
module.exports = getAllAnimals;