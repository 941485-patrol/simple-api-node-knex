const searchStatus = function(req){
    if (req.query.s == undefined) {
        return function(){}
    } else {
        return function(){
            this.where('name', 'ilike', `%${req.query.s}%`)
                .orWhere('description', 'ilike', `%${req.query.s}%`)
            }
    }
}
module.exports = searchStatus;