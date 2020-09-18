var express = require('express');
var multer = require('multer');
var router = express.Router();
var upload = multer();

const getStatuses = require('./status/getStatuses');
const createStatus = require('./status/createStatus');
const getStatus = require('./status/getStatus');
const updateStatus = require('./status/updateStatus');
const deleteStatus = require('./status/deleteStatus');

router.route('/')
  .get(getStatuses)
  .post(upload.none(), createStatus)

router.route('/:id')
  .get(getStatus)
  .put(upload.none(), updateStatus)
  .delete(upload.none(), deleteStatus)
  
module.exports = router;