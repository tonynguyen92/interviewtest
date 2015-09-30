var Connector = require('../config_database');
var con = new Connector();
	module.exports = {

		AnswerByQ: function(question_id, callback) {
			con.db
			.order_by('answer_id asc')
			.where({question_id: question_id})
			.get('Answer', function(err, results, fields) {
			return callback(results);
		});
		},
		New: function(desc, question_id, status_id, correct){
			con.db.insert('Answer', { answer_id: 0, description: desc, question_id: question_id, status_id: status_id, correct_answer: correct },function(err,info){
				console.log(err);
			});
		},
		Delete: function(id){
			con.db.where({answer_id: id}).delete('Answer');
		},
		Update: function(id, desc, question_id, correct, status_id){
			var formatedMysqlString = (new Date ((new Date((new Date(new Date())).toISOString() )).getTime() - ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');
            console.log( formatedMysqlString );
			con.db.where({answer_id: id}).update('Answer',{description: desc, status_id: status_id, correct_answer: correct, question_id: question_id, updated_at: formatedMysqlString }, function(err,info){
				console.log(err);
			});
		},
		Find: function(id, callback){
			con.db
			.where({answer_id: id})
			.get('Answer', function(err, results, fields) {
			 if (!err) {
			 	if(!results.length)
			 	callback(null, "no data");
			 else callback(null,results);
			 }
			else callback(err, null);
		});
		}
	};
