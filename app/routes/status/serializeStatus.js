const serializeStatus = (status) => {
    var animalIdsArr=[];
    status.animal_ids.forEach(animal=>{
        animalIdsArr.push({
            'animal_id': animal._id,
            'name': animal.name,
            'description': animal.description,
            'created_at': animal.created_at,
            'updated_at': animal.updated_at,
        });
    });
    var statusObj = {
        '_id': status._id,
        'name': status.name,
        'description': status.description,
        'created_at': status.created_at,
        'updated_at': status.updated_at,
        'animals': animalIdsArr,
    }
    return statusObj;
}
module.exports = serializeStatus;