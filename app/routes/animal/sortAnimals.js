const sortAnimals = function(req) {
    var sort = req.query.sort == undefined ? '_id' : req.query.sort.toString();
    var sortFields = ['_id', 'name', 'description', 'type_id', 'status_id', '-_id', '-name', '-description', '-type_id', '-status_id']; 
    if (sortFields.includes(sort) == false) throw new Error('Invalid sort field.');
    return sort;
}
module.exports = sortAnimals;