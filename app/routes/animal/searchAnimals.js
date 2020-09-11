const searchAnimals = function (req) {
    if (req.query.s == undefined) {
        return function(){}
    } else {
        return function(){
            this.where('animals.name', 'ilike', `%${req.query.s}%`)
                .orWhere('types.name', 'ilike', `%${req.query.s}%`)
                .orWhere('status.name', 'ilike', `%${req.query.s}%`)
            }
    }
}
module.exports = searchAnimals;