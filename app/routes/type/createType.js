const Type = require('../../models/type');
const Errormsg = require('../../errmsg');
const createType = async (req, res, next ) => {
  try {
    var type = new Type 
    ({
      name: req.body.name,
      environment: req.body.environment, 
    });
    await type.save();
    res.status(200).json({"message": "Type created"});
  } catch (error) {
    Errormsg(error, res);
  }
}
module.exports = createType;