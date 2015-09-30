var Connector = require('../config_database');
var con = new Connector();
	module.exports = {
		All: function() {
			con.db.count('Level', function(err, results, fields) {
			console.log(results);
		});
		},
		New: function(name){
			con.db.get('Level', function(err, results, fields) {
			var id =  results[results.length-1].level_id+1;
			con.db.insert('Level', { level_id: id, level_name: name });
		});
		},
		Delete: function(id){
			con.db.where({level_id: id}).delete('Level');
		},
		Update: function(id, name){
			con.db.where({level_id: id}).update('Level',{level_name: name});
		}
	};
