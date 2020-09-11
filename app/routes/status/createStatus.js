const Status = require('../../models/status');
const Errmsg = require('../../errmsg');
const createStatus = async function (req, res, next) {
    try {
        var status = new Status({
            name: req.body.name,
            description: req.body.description,
        });
        await status.save();
        res.status(200).json({'message': 'Status created.'});
    } catch (error) {
        Errmsg(error, res);
    }
}
module.exports = createStatus;
