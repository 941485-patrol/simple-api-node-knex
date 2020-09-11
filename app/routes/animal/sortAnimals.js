const sortAnimals = function(req) {
    var order = 'asc';
    var sort = req.query.sort == undefined ? 'id' : req.query.sort.toString();
    var sortFields = ['id', 'name', 'description', 'type_id', 'status_id', 'typeName', 'statusName', 'created', 'updated', '-id', '-name', '-description', '-type_id', '-status_id', '-typeName', '-statusName', '-created', '-updated']; 
    if (sortFields.includes(sort) == false) throw new Error('Invalid sort field.');
    if (sort.includes('-') == true) order = 'desc';
    if (sort == 'id' || sort == '-id') {sort = 'animals.id';}
    if (sort == 'description' || sort == '-description') {sort = 'animals.description';}
    if (sort == 'created' || sort == '-created') {sort = 'animals.created_at';}
    if (sort == 'updated' || sort == '-updated') {sort = 'animals.updated_at';}
    if (sort == 'type_id' || sort == '-type_id') {sort = 'animals.type_id';}
    if (sort == 'status_id' || sort == 'status_id') {sort = 'animals.status_id';}
    if (sort == 'typeName' || sort == '-typeName') {sort = 'types.name';}
    if (sort == 'statusName' || sort == '-statusName') {sort = 'status.name';}
    return [sort, order];
}
module.exports = sortAnimals;