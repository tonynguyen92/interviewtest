var express      = require('express');
var routerexam   = express.Router();
var Exam         = require('../models/exam');
var QuestionExam = require('../models/questionexam');
var Question     = require('../models/question');
var nodemailer   = require('nodemailer');
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

routerexam.get('/exam/show/:id', function (req, res){
	Exam.Find(req.params.id, function (err, result){
		res.render('exam/show',{
		title: "Exam",
		exam: result
	});
	});
});

routerexam.get('/exam/edit/:id', function (req, res){
	Exam.Find(req.params.id, function (err, result){
	  res.render('exam/edit',{
	  	title: "Edit Exam",
	  	exam: result
	  });
	});
});

routerexam.post('/exam/update/:id', function (req, res){
	var description = req.body.description;
	var duration = req.body.duration;
	var status = req.body.status;
	Exam.Update(req.params.id, description, duration, status);
	res.redirect('/exam');
});
routerexam.post('/exam/invite/:id', function (req, res){
	var email = req.body.email;
	console.log(email);

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ninh.uit@gmail.com',
        pass: ''
    }
});
transporter.sendMail({
    from: 'ninh.uit@gmail.com',
    to: 'ninh.uit@gmail.com',
    subject: 'hello',
    text: 'hello world!'
});
	res.redirect('/exam');
});

module.exports = routerexam;