var Connector = require('../config_database');
var con = new Connector();
	module.exports = {

		All: function(callback) {
			con.db
			.join('QuestionType','QuestionType.question_type_id=Question.question_type_id')
			.join('Status','Status.status_id=Question.status_id')
			.join('Category','Category.category_id=Question.category_id')
			.join('Level','Level.level_id=Question.level_id')
			.order_by('question_id asc')
			.get('Question', function(err, results, fields) {
			return callback(results);
		});
		},
		New: function(desc, status_id, category_id, level_id, question_type_id){
			var created_date = new Date();
			con.db.insert('Question', { question_id: 0, description: desc, status_id: status_id, category_id: category_id, level_id: level_id, question_type_id: question_type_id },function(err,info){
				console.log(err);
			});
		},
		Delete: function(id){
			con.db.where({question_id: id}).delete('Answer');
			con.db.where({question_id: id}).delete('Question');
		},
		Update: function(id, desc, status_id, category_id, level_id, question_type_id){
			var formatedMysqlString = (new Date ((new Date((new Date(new Date())).toISOString() )).getTime() - ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');
            console.log( formatedMysqlString );
			con.db.where({question_id: id}).update('Question',{description: desc, status_id: status_id, category_id: category_id, level_id: level_id, question_type_id: question_type_id, updated_at: formatedMysqlString }, function(err,info){
				console.log(err);
			});
		},
		Find: function(id, callback){
			con.db
			.where({question_id: id})
			.join('QuestionType','QuestionType.question_type_id=Question.question_type_id')
			.join('Status','Status.status_id=Question.status_id')
			.join('Category','Category.category_id=Question.category_id')
			.join('Level','Level.level_id=Question.level_id')
			.get('Question', function(err, results, fields) {
			 if (!err) {
			 	if(!results.length)
			 	callback(null, "no data");
			 else callback(null,results);
			 }
			else callback(err, null);
		});
		}
	};
