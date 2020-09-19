const serializeType = (type, url, one=false) => {
    var _this = one == false ? `/api/type/${type.id}`.replace(/\/{2,}/,'/') :`${url}`.replace(/\/{2,}/,'/');
    var typeObj = {
        '_this': _this,
        'id': type.id,
        'name': type.name,
        'environment': type.environment,
        'created_at': type.created_at,
        'updated_at': type.updated_at,
        'animals': type.animal_ids
    }
    return typeObj;
}
module.exports = serializeType;