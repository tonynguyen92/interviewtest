var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

//config app

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//use middleware
app.use(bodyParser());
app.use(express.static(path.join(__dirname,'bower_components')));

//define routes
var router = require('./todos');
var routerquestion = require('./controllers/question');		
app.use(router);
app.use(routerquestion);
//start server
var port = process.env.PORT||3000;
app.listen(port,function () {
	console.log("ready on port" + port);
});


