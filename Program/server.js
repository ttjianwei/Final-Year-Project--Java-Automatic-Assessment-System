var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var db = require('./config');
var multer  = require('multer');
var esession= require('express-session');
var upload = multer({ dest: 'uploads/' });
var errorhandler = require('errorhandler');
var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
require('./app/routes')(app);

app.use(express.static(__dirname + '/app'));
app.use(errorhandler({log: errorNotification}));

function errorNotification (err, str, req) {
  var title = 'Error in ' + req.method + ' ' + req.url

  notifier.notify({
    title: title,
    message: str
  })
}


app.listen(3000,function(err){

if(err){

	console.log(err);
}
else{

	console.log("Listening on port 3000");
}

});
