const typeEnvExists = function(addOrEdit='edit', env, id=null){
    if (addOrEdit == 'add') {
        return function(){
            this.whereRaw('lower(types.environment) = ?', env);
        }
    } else if (addOrEdit == 'edit') {
        return function(){
            this.whereRaw('lower(types.environment) = ? AND types.id <> ?',[env, id]);
        }
    } else {
        throw new Error('Wrong typeEnvExists parameter.');
    }
}
module.exports = typeEnvExists;