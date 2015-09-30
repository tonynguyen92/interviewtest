var Connector = require('../config_database');
var con = new Connector();
	module.exports = {
		All: function() {
			con.db.count('UserType', function(err, results, fields) {
			console.log(results)
		});
		},
		New: function(name){
			con.db.get('UserType', function(err, results, fields) {
			var id =  results[results.length-1].user_type_id+1;
			con.db.insert('UserType', { user_type_id: id, user_type_name: name });
		});
		},
		Delete: function(id){
			con.db.where({user_type_id: id}).delete('UserType');
		},
		Update: function(id, name){
			con.db.where({user_type_id: id}).update('UserType',{user_type_name: name});
		}
	};
