// contact.js
var fs = require('fs');
var _ = require('lodash');

var DATA_SOURCE = 'directorio.json';

function findByName (contactsList, name) {
	for (var i = 0; i < contactsList.length; i++) {
		if(contactsList[i].name == name) {
			return contactsList[i];
		}
	}

	return null;
}
// Funcion para mostrar un contacto
function contactInfo(contact) {
	console.log('--');
	console.log(`name: ${contact.name}`);
	console.log(`phone: ${contact.phone}`);
}

// Lee el archivo
function readFile(name, callback) {
	// Lee el archivo
	fs.readFile(name, 'utf8', function(err,data){
		// Error
		if(err) {
			console.log("Error");
		}

		// Callback Function
		callback(data);
	});
}
// Graba en el archivo
function writeFile(name, data, callback) {
	fs.writeFile(name, data, function(err) {
		// Error
		if(err){
			console.log("Error");
		}

		callback();
	});
}

// Contacto Service: Contiene las operaciones para los contactos
var contactService = {
	// list(): Lista todos los contactos de directorio.json
	list: function(){
		var callback = function(data){
			// Convierte el archivo a un objeto de JavaScript
			var contactsList = JSON.parse(data);
			// Mensaje con la cantidad de contactos
			console.log(`Mostrando ${contactsList.length} contacto(s)`);
			// Muestra la lista de los contactos
			for (var i = 0; i < contactsList.length; i++) {
				contactInfo(contactsList[i]);
			}
		};

		readFile(DATA_SOURCE, callback);
	},
	// add(contact: Contacto para agregar): Agrega un nuevo contacto a directorio.json
	add: function(contact){
		// Funcion que se llama despues de leer el archivo
		var callback = function(data) {
			// Convierte el archivo a un objeto de JavaScript
			var contactsList = JSON.parse(data);
			// Concatena la lista de contactos con el nuevo contacto
			// y lo trasforma en una cadena para grabar en el directorio.json
			var saveData = JSON.stringify(_.concat(contactsList, contact));

			// Funcion que se llama despues de escribir en el archivo
			var writeCallback = function () {
				// Mensaje de registro exitoso con la informacion del contacto
				console.log("Contacto registrado");
				contactInfo(contact);
			}

			writeFile(DATA_SOURCE, saveData, writeCallback);
		}

		readFile(DATA_SOURCE, callback);
	},
	// read(name: Nombre a buscar): Busca un contacto por el nombre
	read: function (name) {
		// Funcion llamada despues de leer un archivo
		var callback = function(data) {
			// Busca el contacto
			var contact = findByName(JSON.parse(data), name);

			if(contact != null) {
				console.log("Contacto encontrado");
				contactInfo(contact);
			} else {
				console.log("Contacto no encontrado");
			}
		}

		readFile(DATA_SOURCE, callback);
	},
	remove: function(name) {
		// Funcion que se llama despues de leer el archivo
		var callback = function(data) {
			// Convierte el archivo a un objeto de JavaScript
			var contactsList = JSON.parse(data);
			// Encuentra el contacto
			var contact = findByName(contactsList, name);
			// Borra el contacto
			//  evens -> Devuelve una lista de los elementos eliminados
			var evens = _.remove(contactsList, function(c) {
				return c.name == contact.name;
			});
			var saveData = JSON.stringify(contactsList);

			// Funcion que se llama despues de escribir en el archivo
			var writeCallback = function () {
				// Mensaje de borrado exitoso con la informacion del contacto
				console.log("Contacto eliminado");
			}
			// Escribe la nueva data
			writeFile(DATA_SOURCE, saveData, writeCallback);
		}

		// Lee el archivo
		readFile(DATA_SOURCE, callback);
	}	
}

module.exports = contactService;