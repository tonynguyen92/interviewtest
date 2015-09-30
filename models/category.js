var Connector = require('../config_database');
var con = new Connector();
	module.exports = {
		All: function() {
			con.db.count('Category', function(err, results, fields) {
			console.log(results);
		});
		},
		New: function(name){
			con.db.get('Category', function(err, results, fields) {
			var id =  results[results.length-1].category_id+1;
			con.db.insert('Category', { category_id: id, category_name: name });
		});
		},
		Delete: function(id){
			con.db.where({category_id: id}).delete('Category');
		},
		Update: function(id, name){
			con.db.where({category_id: id}).update('Category',{category_name: name});
		}
	};
