var Connector = require('../config_database');
var con = new Connector();
	module.exports = {
		All: function() {
			con.db.count('Status', function(err, results, fields) {
			console.log(results);
		});
		},
		New: function(name){
			con.db.get('Status', function(err, results, fields) {
			var id =  results[results.length-1].status_id+1;
			con.db.insert('Status', { status_id: id, status_name: name });
		});
		},
		Delete: function(id){
			con.db.where({status_id: id}).delete('Status');
		},
		Update: function(id, name){
			con.db.where({status_id: id}).update('Status',{status_name: name});
		}
	};
