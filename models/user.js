var Connector = require('../config_database');
var md5 = require('md5');
var con = new Connector();
	module.exports = {

		All: function(callback) {
			con.db
			.join('UserType','UserType.user_type_id=User.user_type_id')
			.join('Status','Status.status_id=User.status_id')
			.order_by('user_id asc')
			.get('User', function(err, results, fields) {
				console.log(err);
			return callback(results);
		});
		},
		New: function(first_name, last_name, address, phone, email, password, user_type_id, status_id){

			con.db.insert('User', { user_id: 0, first_name: first_name, status_id: status_id, last_name: last_name,address: address, phone: phone, email: email, password: md5(password), user_type_id: user_type_id },function(err,info){
				console.log(err);
			});
		},
		Delete: function(id){
			con.db.where({user_id: id}).delete('User');
		},
		Update: function(id, first_name, last_name, address, phone, email, password, user_type_id, status_id){
			var formatedMysqlString = (new Date ((new Date((new Date(new Date())).toISOString() )).getTime() - ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');
			con.db.where({user_id: id}).update('User',{first_name: first_name, last_name: last_name, address: address, phone: phone, email: email, password: md5(password), user_type_id: user_type_id, status_id: status_id, updated_at: formatedMysqlString }, function(err,info){
				console.log(err);
			});
		},
		Find: function(id, callback){
			con.db
			.where({user_id: id})
			.join('UserType','UserType.user_type_id=User.user_type_id')
			.join('Status','Status.status_id=User.status_id')
			.get('User', function(err, results, fields) {
			 if (!err) {
			 	if(!results.length)
			 	callback(null, "no data");
			 else callback(null,results);
			 }
			else callback(err, null);
		});
		}
	};
