const sortStatus = function(req){
    var order = 'asc';
    var sort = req.query.sort == undefined ? 'id' : req.query.sort.toString();
    var sortFields = ['id', 'name', 'description', 'created', 'updated', '-id', '-name', '-description', '-created', '-updated']; 
    if (sortFields.includes(sort) == false) throw new Error('Invalid sort field.');
    if (sort.includes('-') == true) order = 'desc';
    if (sort == 'id' || sort == '-id') {sort = 'id';}
    if (sort == 'name' || sort == '-name') {sort = 'name';}
    if (sort == 'description' || sort == '-description') {sort = 'description';}
    if (sort == 'created' || sort == '-created') {sort = 'created_at';}
    if (sort == 'updated' || sort == '-updated') {sort = 'updated_at';}
    return [sort, order];
}
module.exports = sortStatus;