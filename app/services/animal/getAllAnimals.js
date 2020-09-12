const pageAnimals = require('./pageAnimals');
const searchAnimals = require('./searchAnimals');
const sortAnimals = require('./sortAnimals');
const AnimalRepo = require('../../repositories/animal');
const getAllAnimals = function(req){
    var animal = new AnimalRepo(req);
    var searchee = searchAnimals(req);
    var perPage = 5;
    var page = pageAnimals(req);
    var pageSkip = parseInt(page) - parseInt(1);
    var sort = sortAnimals(req);
    var animals = animal.getAllAnimals(searchee, perPage, page, pageSkip, sort);
    return animals;
}
module.exports = getAllAnimals;