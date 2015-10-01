var express = require('express');
var session = require('express-session');
var User = require('./models/user');
// var Status = require('./models/status');\
var routes = express();
routes.use(session({secret: 'ssshhhhh'}));


routes.get('/',function (req,res){
var sess = req.session;
if(sess.email)
{
    res.render('index',{
	title: 'My App'
	});
}
else{
	res.redirect('/login');
}
});


routes.post('/add',function (req,res){

var newItem = req.body.newItem;
todoItems.push(newItem);
res.redirect('/');
});

// login form
routes.get('/login',function (req, res){
	res.render('login');
});
routes.post('/checklogin', function (req, res){
	var email    = req.body.email;
	var password = req.body.password;
	var sess     = req.session;
	User.CheckLogin(email, password, function(messager, result){
		if(!messager){
			console.log(messager);
			sess.email   = email;
			res.redirect('/');
			res.end("done");
		}
		else{
			console.log(messager);
			res.redirect('/login');
		}
	});
});
//define router


module.exports = routes;