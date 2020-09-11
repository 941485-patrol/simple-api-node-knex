const checkTypeId = async (value) => {
    const Animal = require('../models/animal');
    if (this.__v != undefined ) {
        if (value.length > 0) {
            value.forEach(val => {
                if (Animal.exists({_id: val}) === false) return false;
            });
        }
    } else {
        return true;
    }
}
module.exports = checkTypeId;