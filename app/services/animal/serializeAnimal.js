const serializeAnimal = (animal, url, one=false)=>{
  var typeObj = null;
  var statusObj = null;
  var _this  = one == false ? `/api/animal/${animal.id}`.replace(/\/{2,}/,'/'):`${url}`.replace(/\/{2,}/,'/');
  if (animal.type_id != null) {
    typeObj = {
      '_this': `/api/type/${animal.type_id}`,
      'type_id': animal.type_id,
      'name': animal.typename,
      'environment': animal.typeenv
    }
  }
  if (animal.status_id != null) {
    statusObj = {
      '_this': `/api/status/${animal.status_id}`,
      'status_id': animal.status_id,
      'name': animal.statname,
      'description': animal.statdesc
    }
  }
    var animalObj = {
        '_this':  _this,
        'id': animal.id,
        'name': animal.name,
        'description': animal.description,
        'created_at': animal.created_at,
        'updated_at': animal.updated_at,
        'type': typeObj,
        'status': statusObj,
    }
    return animalObj;
}
module.exports = serializeAnimal;