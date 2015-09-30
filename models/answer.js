var Connector = require('../config_database');
var con = new Connector();
	module.exports = {

		All: function(callback) {
			con.db
			.order_by('answer_id asc')
			.get('Answer', function(err, results, fields) {
			return callback(results);
		});
		},
		New: function(desc, question_id, status_id, correct){
			con = new Connector();
			con.db.get('Answer', function(err, results, fields) {
			var id =1;
			try {
				id =  results[results.length-1].answer_id+1;
			}
		    catch (e){
		    }
			con.db.insert('Answer', { answer_id: id, description: desc, question_id: question_id, status_id: status_id, correct_answer: correct },function(err,info){
				console.log(err);
			});
		});
		},
		Delete: function(id){
			con.db.where({answer_id: id}).delete('Answer');
		},
		Update: function(id, desc, status_id, category_id, level_id, question_type_id){
			var formatedMysqlString = (new Date ((new Date((new Date(new Date())).toISOString() )).getTime() - ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');
            console.log( formatedMysqlString );
			con.db.where({answer_id: id}).update('Answer',{description: desc, status_id: status_id, category_id: category_id, level_id: level_id, question_type_id: question_type_id, updated_at: formatedMysqlString }, function(err,info){
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
