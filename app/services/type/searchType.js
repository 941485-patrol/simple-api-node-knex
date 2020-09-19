const searchType = function(req){
    if (req.query.s == undefined) {
        return function(){}
    } else {
        return function(){
            this.where('name', 'ilike', `%${req.query.s}%`)
                .orWhere('environment', 'ilike', `%${req.query.s}%`)
            }
    }
}
module.exports = searchType;