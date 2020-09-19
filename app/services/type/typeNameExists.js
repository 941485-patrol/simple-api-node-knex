const typeNameExists = function(addOrEdit='edit', name, id=null){
    if (addOrEdit == 'add') {
        return function(){
            this.whereRaw('lower(types.name) = ?', name);
        }
    } else if (addOrEdit == 'edit') {
        return function(){
            this.whereRaw('lower(types.name) = ? AND types.id <> ?',[name, id]);
        }
    } else {
        throw new Error('Wrong typeNameExists parameter.');
    }
}
module.exports = typeNameExists;