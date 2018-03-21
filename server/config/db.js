'use strict';

const mysql = require('mysql');

const obj = {
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'world'
};

const pool = mysql.createPool(obj);

module.exports = {
	query: function(){
		let sql_args = [];
		let args = [];
		let i;
		for (i = 0; i < arguments.length; i++){
			args.push(arguments[i]);
		}
		let callback = args[args.length - 1]; // last arg is callback
		pool.getConnection(function(err, connection) {
			if (err) {
				console.log(err);
				return callback(err);
			}
			if (args.length > 2) {
				sql_args = args[1];
			}

			connection.query(args[0], sql_args, function(err, results) {
				connection.release();
				if (err) {
					console.log(err);
					return callback(err);
				}
				callback(null, results);
			});
		})
	}
};