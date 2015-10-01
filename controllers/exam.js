var express      = require('express');
var routerexam   = express.Router();
var Exam         = require('../models/exam');
var QuestionExam = require('../models/questionexam');
var Question     = require('../models/question');

routerexam.get('/exam',function (req, res){
  Exam.All(function(result){
  	res.render('exam/index', {
  	title: "Exams",
  	exams: result
  });
  });
});

routerexam.get('/exam/new', function (req, res){
	res.render('exam/new',{
		title: "New Exam"
	});
});

routerexam.post('/exam/add', function (req, res){
	var description = req.body.description;
	var duration = req.body.duration;
	var status = req.body.status;
	Exam.New(description, duration, status);
	Exam.All(function (results){
		Question.All(function (resultsq){
			for (var i=0;i<resultsq.length;i++){
				QuestionExam.New(resultsq[i].question_id, results[results.length-1].exam_id);
			}
		});
	});
	res.redirect('/exam');
});

routerexam.get('/exam/delete/:id', function (req, res){
	Exam.Delete(req.params.id);
	res.redirect('/exam');
});
module.exports = routerexam;