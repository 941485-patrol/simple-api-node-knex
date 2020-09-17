var express = require('express');
var multer = require('multer');
var router = express.Router();
var upload = multer();

var getAnimals = require('./animal/getAnimals');
var createAnimal = require('./animal/createAnimal');
var getAnimal = require('./animal/getAnimal');
var updateAnimal = require('./animal/updateAnimal');
var deleteAnimal = require('./animal/deleteAnimal');

router.route('/')
  .get(getAnimals)
  .post(upload.none(), createAnimal)

router.route('/:id')
  .get(getAnimal)
  .put(upload.none(), updateAnimal)
  .delete(upload.none(), deleteAnimal)

module.exports = router;