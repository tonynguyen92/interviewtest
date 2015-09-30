var express = require('express');
var routerquestion = express.Router();
var Question = require('../models/question');


routerquestion.get('/question',function (req, res){
	Question.All(function (results){
	res.render('question/index',{
		title: "Questions",
		questions: results
	});
	});
});

routerquestion.get('/question/new',function (req,res){
	res.render('question/new',{
		title: "New Question"
	});
});

routerquestion.post('/question/add',function (req, res){
	var description = req.body.description;
	var questiontype = req.body.questiontype;
	var status= req.body.status;
	Question.New(description,status,1,1,questiontype);
	res.redirect('/question');
});

routerquestion.get('/question/delete/:id', function (req, res){
	Question.Delete(req.params.id);
	res.redirect('/question');
});

routerquestion.get('/question/edit/:id', function (req, res){
	Question.Find(req.params.id, function(error,results){
	res.render('question/edit',{
		title: "Edit Question",
		question: results
	});
});
});
routerquestion.post('/question/update/:id', function (req, res){
	var description = req.body.description;
	var questiontype = req.body.questiontype;
	var status = req.body.status;
	Question.Update(req.params.id,description,status,1,1,questiontype);
	res.redirect('/question');
});
module.exports = routerquestion;