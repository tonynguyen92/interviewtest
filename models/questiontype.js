var Connector = require('../config_database');
var con = new Connector();
	module.exports = {
		All: function() {
			con.db.count('QuestionType', function(err, results, fields) {
			console.log(results);
		});
		},
		New: function(name){
			con.db.get('QuestionType', function(err, results, fields) {
			var id =  results[results.length-1].question_type_id+1;
			con.db.insert('QuestionType', { question_type_id: id, question_type_name: name });
		});
		},
		Delete: function(id){
			con.db.where({question_type_id: id}).delete('QuestionType');
		},
		Update: function(id, name){
			con.db.where({question_type_id: id}).update('QuestionType',{question_type_name: name});
		}
	};
