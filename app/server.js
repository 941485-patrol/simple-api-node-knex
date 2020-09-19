var express = require("express");
var app = express();
var cookieParser = require('cookie-parser');
var indexRouter = require('./routes/index');
var typeRouter = require('./routes/type');
var animalRouter = require('./routes/animal');
var statusRouter = require('./routes/status');
var userRouter = require('./routes/user');
var cors = require('cors');
var loginRequired = require('./helpers/loginRequired');
var port = process.env.PORT || 3000;
// var setResponse = require('./helpers/setResponse');
var corsOptions = {
  origin:true,
  methods:'GET,PUT,POST,DELETE,HEAD,PATCH',
  credentials:true
}

app.listen(port,()=>{ console.log(`Listening to port ${port}`)});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(`${process.env.SECRET_KEY}`));
app.use(cors(corsOptions));
// app.use(setResponse);
app.options('*', cors(corsOptions)); //preflight
app.use('/', indexRouter);
app.use('/api/user', userRouter);
app.use(loginRequired);
app.use('/api/type', typeRouter);
app.use('/api/status', statusRouter);
app.use('/api/animal', animalRouter);
module.exports = app;