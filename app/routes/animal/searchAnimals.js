const searchAnimals = function (req) {
    if (req.query.s == undefined) {
        return null;
    } else {
        return {name: new RegExp(`${req.query.s}`,'i')};
    }
}
module.exports = searchAnimals;