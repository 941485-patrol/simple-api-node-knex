const serializeStatus = (status, url) => {
    // var animalIdsArr=[];
    // status.animal_ids.forEach(animal=>{
    //     animalIdsArr.push({
    //         'animal_id': animal._id,
    //         'name': animal.name,
    //         'description': animal.description,
    // });
    var statusObj = {
        '_this': url,
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