'use strict';

let admins = [
	{
		id: '1',
		name: 'Quan',
		class: 'k62ie3',
		age: '19'
	},
	{
		id: '2',
		name: 'Si',
		class: 'k62ie3',
		age: '18'
	},
	{
		id: '3',
		name: 'Cuong',
		class: 'k62ie6',
		age: '19'
	}
];

// promisify set timeout function
function delay(time) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();	
		}, time);	
	});
}

function getAllAdmins() {
	return delay(1000).then(() => Promise.resolve(admins));
}

function getAdmins(id) {
	const filteredAdmins = admins.filter(
		(admin, i) => {
			return admin.id === id;
		}	
	);

	return delay(1000).then(() => Promise.resolve(filteredAdmins));
}

function createNewAdmin({id, name}) {
	const newAdmin = {id, name};	
	admins.push(newAdmin);

	return delay(1000).then(() => Promise.resolve(admins));
}

//console.log('getAdmins id = 2', getAdmins(2), 'expect Si');
//console.log('getAdmins id = 3', getAdmins(3), 'expect Cuong');

module.exports = {
	getAllAdmins, 
	getAdmins,
	createNewAdmin
}
