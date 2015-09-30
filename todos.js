var express = require('express');
var routes = express.Router();
// var Status = require('./models/status');


var todoItems =["Saab", "Volvo", "BMW"];
routes.get('/',function (req,res){
res.render('index',{
	title: 'My App',
	items: todoItems
	});
});

routes.post('/add',function (req,res){

// var Connector = require('./config_database');
// var s = new Connector();
// s.db.insert('Status', { status_id: '1', status_name: 'Smith' });

var newItem = req.body.newItem;
todoItems.push(newItem);
res.redirect('/');
});

//define router


module.exports = routes;