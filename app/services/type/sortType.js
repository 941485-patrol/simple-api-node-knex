const sortType = function(req){
    var order = 'asc';
    var sort = req.query.sort == undefined ? 'id' : req.query.sort.toString();
    var sortFields = ['id', 'name', 'environment', 'created', 'updated', '-id', '-name', '-environment', '-created', '-updated']; 
    if (sortFields.includes(sort) == false) throw new Error('Invalid sort field.');
    if (sort.includes('-') == true) order = 'desc';
    if (sort == 'id' || sort == '-id') {sort = 'id';}
    if (sort == 'name' || sort == '-name') {sort = 'name';}
    if (sort == 'environment' || sort == '-environment') {sort = 'environment';}
    if (sort == 'created' || sort == '-created') {sort = 'created_at';}
    if (sort == 'updated' || sort == '-updated') {sort = 'updated_at';}
    return [sort, order];
}
module.exports = sortType;