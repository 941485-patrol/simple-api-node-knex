const checkAnimal = function(addOrEdit='edit', name, description){
    if (addOrEdit == 'add') {
        return function(){
            this.where('animals.name', 'ilike', `%${name}%`)
            .orWhere('animals.description', 'ilike', `%${description}%`)
        }
    } else if (addOrEdit == 'edit') {
        return function(){
            this.where('animals.name', 'ilike', `%${name}%`)
            .orWhere('animals.description', 'ilike', `%${description}%`)
            .andWhere('animals.id', '!=', id)
        }
    } else {
        throw new Error('Wrong checkAnimal parameter. Choose between "add" or "edit".');
    }
}
module.exports = checkAnimal;