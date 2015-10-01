var Connector = require('../config_database');
var con = new Connector();
	module.exports = {
		New: function(question_id, exam_id) {
			con.db.insert('QuestionExam', { question_exam_id: 0, question_id: question_id, exam_id: exam_id},function(err,info){
				console.log(err);
			});
		}
	};
