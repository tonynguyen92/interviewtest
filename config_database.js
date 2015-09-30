function Connection () {
	var Db = require('mysql-activerecord');
    this.db = new Db.Adapter({
    server: 'localhost',
    username: 'root',
    password: '',
    database: 'interview_test',
    reconnectTimeout: 2000
});
}
module.exports = Connection;