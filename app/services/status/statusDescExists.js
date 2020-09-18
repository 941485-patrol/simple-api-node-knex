const statusDescExists = function(addOrEdit='edit', desc, id=null){
    if (addOrEdit == 'add') {
        return function(){
            this.whereRaw('lower(status.description) = ?', desc);
        }
    } else if (addOrEdit == 'edit') {
        return function(){
            this.whereRaw('lower(status.description) = ? AND status.id <> ?',[desc, id]);
        }
    } else {
        throw new Error('Wrong statusDescExists parameter.');
    }
}
module.exports = statusDescExists;