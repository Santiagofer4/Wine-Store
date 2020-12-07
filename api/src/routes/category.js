const server = require('express').Router();
const { Category } = require('../db.js');

server.get('/', (req, res, next) => {
	Category.findAll()
		.then(cat => {
			res.send(cat);
		})
		.catch(next);
});

module.exports = server;
