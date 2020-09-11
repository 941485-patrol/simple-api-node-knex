const animalNameExists = async function(value, args) {
    var Animal = require('../models/animal')
    if (this.__v != undefined) {
        var animalCount = await Animal.findOne({_id:{'$ne': this._id}, name: new RegExp(`^${value}$`,'i')});
        if (animalCount != null) return false;
    } else {
        var animalCount = await Animal.findOne({name: new RegExp(`^${value}$`,'i')});
        if (animalCount != null) return false;
    }

};
module.exports = animalNameExists;