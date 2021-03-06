var Connector = require('../config_database');
var con = new Connector();
	module.exports = {

		All: function(callback) {
			con.db
			.order_by('exam_id asc')
			.join('Status','Status.status_id=Exam.status_id')
			.get('Exam', function(err, results, fields) {
			return callback(results);
		});
		},
		New: function(desc, duration, status_id){
			con.db.insert('Exam', { exam_id: 0, description: desc, duration: duration, status_id: status_id},function(err,info){
				console.log(err);
			});
		},
		Delete: function(id){
			con.db.where({exam_id: id}).delete('QuestionExam');
			con.db.where({exam_id: id}).delete('Exam');
		},
		Update: function(id, desc, duration, status_id){
			var formatedMysqlString = (new Date ((new Date((new Date(new Date())).toISOString() )).getTime() - ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');
			con.db.where({exam_id: id}).update('Exam',{description: desc, status_id: status_id, duration: duration, updated_at: formatedMysqlString }, function(err,info){
				console.log(err);
			});
		},
		Find: function(id, callback){
			con.db
			.join('Status','Status.status_id=Exam.status_id')
			.where({exam_id: id})
			.get('Exam', function(err, results, fields) {
			 if (!err) {
			 	if(!results.length)
			 	callback(null, "no data");
			 else callback(null,results);
			 }
			else callback(err, null);
		});
		}
	};
