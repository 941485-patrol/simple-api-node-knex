const pageAnimals = require('../../routes/animal/pageAnimals');
const searchAnimals = require('../../routes/animal/searchAnimals');
const sortAnimals = require('../../routes/animal/sortAnimals');
const getAllAnimalsRepo = require('../../repositories/animal/getAllAnimals');
const getAllAnimals = function(req){
    try {
        var searchee = searchAnimals(req);
        var perPage = 5;
        var page = pageAnimals(req);
        var pageSkip = parseInt(page) - parseInt(1);
        var sort = sortAnimals(req);
        return getAllAnimalsRepo(searchee, perPage, page, pageSkip, sort);
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = getAllAnimals;