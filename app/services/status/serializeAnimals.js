const serializeAnimals = function(animal) {
    var animalObj = {
        '_this': `/api/animal/${animal.id}`.replace(/\/{2,}/,'/'),
        'id': animal.id,
        'name': animal.name,
        'description': animal.description
    }
    return animalObj
}
module.exports = serializeAnimals;