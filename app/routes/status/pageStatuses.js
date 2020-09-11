const pageStatuses = function(req){
    var page = req.query.page == undefined ? 1 : req.query.page;
    if (isNaN(page) == true) {throw new Error ('Page must be a number.')} else {parseInt(page)};
    if (page <= 0) throw new Error('Page must be not less than 1.');
    return page;
}
module.exports = pageStatuses;