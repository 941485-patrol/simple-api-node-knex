const animalNameExists = function(addOrEdit='edit', name, id=null){
    if (addOrEdit == 'add') {
        return function(){
            this.whereRaw('lower(animals.name) = ?', name);
        }
    } else if (addOrEdit == 'edit') {
        return function(){
            this.whereRaw('lower(animals.name) = ? AND animals.id <> ?',[name, id]);
        }
    } else {
        throw new Error('Wrong animalNameExists parameter.');
    }
}
module.exports = animalNameExists;