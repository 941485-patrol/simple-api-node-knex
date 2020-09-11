const serializeType = (type)=>{
    var animalIdsArr=[];
    type.animal_ids.forEach(animal=>{
        animalIdsArr.push({
            'animal_id': animal._id,
            'name': animal.name,
            'description': animal.description,
            'created_at': animal.created_at,
            'updated_at': animal.updated_at,
        });
    });
    var typeObj = {
        '_id': type._id,
        'name': type.name,
        'environment': type.environment,
        'created_at': type.created_at,
        'updated_at': type.updated_at,
        'animals': animalIdsArr,
    }
    return typeObj;
}
module.exports = serializeType;