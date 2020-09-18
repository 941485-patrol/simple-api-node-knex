const statusNameExists = function(addOrEdit='edit', name, id=null){
    if (addOrEdit == 'add') {
        return function(){
            this.whereRaw('lower(status.name) = ?', name);
        }
    } else if (addOrEdit == 'edit') {
        return function(){
            this.whereRaw('lower(status.name) = ? AND status.id <> ?',[name, id]);
        }
    } else {
        throw new Error('Wrong statusNameExists parameter.');
    }
}
module.exports = statusNameExists;