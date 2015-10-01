var express = require('express');
var routeruser = express.Router();
var User = require('../models/user');

User.All(function  (result) {
});
routeruser.get('/user', function (req, res){
	User.All(function (results){
	res.render('user/index',{
		title: "Users",
		users: results
	});
	});
});

routeruser.get('/user/new', function (req, res){
	res.render('user/new',{
		title: "New User"
	});
});

routeruser.post('/user/add', function (req, res) {
	var firstname = req.body.firstname;
	var lastname  = req.body.lastname;
	var address   = req.body.address;
	var phone     = req.body.phone;
	var email     = req.body.email;
	var password  = req.body.password;
	var usertype  = req.body.usertype;
	User.New(firstname, lastname, address, phone, email, password, usertype,1);
	res.redirect('/user');
});

routeruser.get('/user/delete/:id', function (req, res) {
	User.Delete(req.params.id);
	res.redirect('/user');
});

routeruser.get('/user/edit/:id', function (req, res) {
	User.Find(req.params.id, function(error,results){
		res.render('user/edit',{
			title: "Edit User",
			user: results
		});
	});
});
routeruser.post('/user/update/:id', function (req, res) {
	var firstname = req.body.firstname;
	var lastname  = req.body.lastname;
	var address   = req.body.address;
	var phone     = req.body.phone;
	var email     = req.body.email;
	var password  = req.body.password;
	var usertype  = req.body.usertype;
	User.Update(req.params.id ,firstname, lastname, address, phone, email, password, usertype,1);
	res.redirect('/user');
});
module.exports = routeruser;