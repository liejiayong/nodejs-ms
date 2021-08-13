const MysqlStore = require('koa-mysql-session');
const { query } = require('../lib/mysql');
const { database } = require('../config/default');

const sidPrefix = 'USER_SID';

exports.sidPrefix = sidPrefix;

exports.getSession = (sid) => {
	let _sql = `select * from _mysql_session_store where id="${sid}";`;
	return query(_sql);
};

exports.myqlSessionStore = new MysqlStore({
	user: database.USERNAME,
	password: database.PASSWORD,
	database: database.DATABASE,
	host: database.HOST,
});
