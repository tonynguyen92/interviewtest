var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
app.use(session({secret: 'ssshhhhh'}));
//config app

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//use middleware
app.use(bodyParser());
app.use(express.static(path.join(__dirname,'bower_components')));

//login form
//define routes
var router = require('./todos');
var routerquestion = require('./controllers/question');		
var routeruser = require('./controllers/user');	
var routerexam = require('./controllers/exam');		
app.use(router);
app.use(function (req, res, next) {
  var sess = req.session;
  if(sess.email)
	{
		app.use(routerquestion);
		app.use(routeruser);
		app.use(routerexam);
	}
	else{
		sess.backURL = req.originalUrl;
		res.redirect('/login');
	}
	next();
});

//start server
var port = process.env.PORT||3000;
app.listen(port,function () {
	console.log("ready on port" + port);
});


