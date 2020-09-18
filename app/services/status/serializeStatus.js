const serializeStatus = (status, url, one=false) => {
    var _this = one == false ? `${url}/${status.id}`.replace(/\/{2,}/,'/') :`${url}`.replace(/\/{2,}/,'/');
    var statusObj = {
        '_this': _this,
        'id': status.id,
        'name': status.name,
        'description': status.description,
        'created_at': status.created_at,
        'updated_at': status.updated_at,
        'animals': status.animal_ids
    }
    return statusObj;
}
module.exports = serializeStatus;