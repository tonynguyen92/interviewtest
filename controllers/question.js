var express = require('express');
var routerquestion = express.Router();
var Question = require('../models/question');
var Answer = require('../models/answer');


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
	var description  = req.body.description;
	var questiontype = req.body.questiontype;
	var status       = req.body.status;
	var answer1      = req.body.answer1;
	var answer2      = req.body.answer2;
	var answer3      = req.body.answer3;
	var correct1= req.body.correctanswer1;
	var correct2= req.body.correctanswer2;
	var correct3= req.body.correctanswer3;
	Question.New(description,status,1,1,questiontype);
	
		if(answer1){
			Question.All(function (results){
			Answer.New(answer1,results[results.length-1].question_id,1,correct1);
			});
		}
		if(answer2){
			Question.All(function (results){
			Answer.New(answer2,results[results.length-1].question_id,1,correct2);
			});
		}
		if(answer3){
			Question.All(function (results){
			Answer.New(answer3,results[results.length-1].question_id,1,correct3);
			});
		}
	
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
	var description  = req.body.description;
	var questiontype = req.body.questiontype;
	var status       = req.body.status;
	Question.Update(req.params.id,description,status,1,1,questiontype);
	res.redirect('/question');
});
module.exports = routerquestion;