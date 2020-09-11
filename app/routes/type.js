var express = require('express');
var multer = require('multer');
var router = express.Router();
var upload = multer();

const createType = require('./type/createType');
const getTypes = require('./type/getTypes');
const getType = require('./type/getType');
const updateType = require('./type/updateType');
const deleteType = require('./type/deleteType');

router.route('/')
  .get(getTypes)
  .post(upload.none(), createType)

router.route('/:id')
  .get(getType)
  .put(upload.none(), updateType)
  .delete(upload.none(), deleteType)

module.exports = router;