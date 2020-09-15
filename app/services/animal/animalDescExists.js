const animalDescExists = function(addOrEdit='edit', desc, id=null){
    if (addOrEdit == 'add') {
        return function(){
            this.whereRaw('lower(animals.description) = ?', desc);
        }
    } else if (addOrEdit == 'edit') {
        return function(){
            this.whereRaw('lower(animals.description) = ? AND animals.id <> ?',[desc, id]);
        }
    } else {
        throw new Error('Wrong animalDescExists parameter.');
    }
}
module.exports = animalDescExists;