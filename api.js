'use strict';

const api = require('express').Router();

const db = require('./database');

api.get('/ping', (req, res) => {
	return res.json({hello: 'pong'});
});

// query: class, age
api.get('/admins', async (req, res) => {
	// get query params (url params)
	const {classname, age} = req.query;

	try {
		const admins = await db.getAllAdmins(); 

		let filteredAdmins = [...admins];

		if (classname) {
			filteredAdmins = admins.filter(
				(admin) => {
					return admin.class === classname;
				}	
			);
		}

		if (age) {
			filteredAdmins = filteredAdmins.filter(
				(admin) => {
					return admin.age === age;
				}	
			);
		}

		return res.json({
			sucess: true,
			data: filteredAdmins
		}); 
	}
	catch(err) {
		console.log('error', err);
		return res.json({
			sucess: false,
			data: null,
			reason: err.message
		}); 
	}
});

api.get('/admins/:id', async (req, res) => {
	const {id} = req.params;

	try {
		const admin = await db.getAdmins(id); 

		return res.json({
			sucess: true,
			data: admin
		}); 
	}
	catch(err) {
		return res.json({
			sucess: false,
			data: null,
			reason: err.message
		}); 
	}
});

/**
 * body params: id: string, name: string
 */
api.post('/admins', async (req, res) => {
	const {id, name} = req.body;

	try {
		if (!id || !name) throw new Error('Id, name are required');

		const admins = await db.createNewAdmin({id, name});

		return res.json({
			sucess: true,
			data: admins
		}); 
	}
	catch(err) {
		return res.json({
			sucess: false,
			data: null,
			reason: err.message
		}); 
	}
});

api.put('/admins/:id', (req, res) => {});

api.delete('/admins/:id', (req, res) => {});

module.exports = api;
