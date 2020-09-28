const { returning } = require('../../knex/knex.js');
const knex = require('../../knex/knex.js');
class Animal {
    constructor(req=null){
        this.req = req;
    }

    getAll(){
        return knex('animals').select('*').orderBy('animals.id','desc')
    }

    getAllAnimals(searchee, perPage, pageSkip, sort){
        return knex('animals')
        .select(knex.raw('animals.*, COUNT(animals.id) over(), status.name AS statName, status.description AS statDesc, types.name AS typeName, types.environment AS typeEnv'))
        .leftJoin('status', 'animals.status_id', 'status.id')
        .leftJoin('types', 'animals.type_id', 'types.id')
        .where(searchee)
        .limit(perPage).offset(pageSkip*perPage)
        .orderBy(sort[0], sort[1]);
    }

    getAnimal(id) {
        return knex('animals')
        .select(knex.raw('animals.*, status.name AS statName, status.description AS statDesc, types.name AS typeName, types.environment AS typeEnv'))
        .leftJoin('status', 'animals.status_id', 'status.id')
        .leftJoin('types', 'animals.type_id', 'types.id')
        .where({'animals.id': id}).first();
    }

    createAnimal(name, description, status_id, type_id){
        return knex('animals').returning('id').insert({name: name, description: description, status_id: status_id, type_id: type_id});
    }

    updateAnimal(id, name, description, status_id, type_id){
        return knex('animals').returning('id').where({'id': id}).update({name: name, description: description, status_id: status_id, type_id: type_id, updated_at: knex.raw('NOW()')});
    }

    deleteAnimal(id){
        return knex('animals').where({'animals.id': id}).del();
    }

    checkAnimalName(searchee){
        return knex('animals').select('animals.name').where(searchee).first();
    }

    checkAnimalDesc(searchee){
        return knex('animals').select('animals.description').where(searchee).first();
    }

    pushIdtoStatus(id, status_id){
        return knex('status').returning('id').where({'status.id': status_id}).update({animal_ids: knex.raw('array_append(animal_ids,?)',[id]), updated_at: knex.raw('NOW()')});
    }

    pushIdtoType(id, type_id){
        return knex('types').returning('id').where({'types.id': type_id}).update({animal_ids: knex.raw('array_append(animal_ids,?)',[id]), updated_at: knex.raw('NOW()')});
    }

    pullIdsfromStatus(id) {
        return knex('status').returning('id').whereRaw('?=ANY(animal_ids)',[id]).update({animal_ids: knex.raw('array_remove(animal_ids,?)',[id]), updated_at: knex.raw('NOW()')});
    }

    pullIdsfromTypes(id) {
        return knex('types').returning('id').whereRaw('?=ANY(animal_ids)',[id]).update({animal_ids: knex.raw('array_remove(animal_ids,?)',[id]), updated_at: knex.raw('NOW()')});
    }
}
module.exports = Animal;