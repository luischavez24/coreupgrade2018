// contact.js
var fs = require('fs');
var _ = require('lodash');

// Funcion para mostrar un contacto
function contactInfo(contact) {
	console.log('--');
	console.log(`name: ${contact.name}`);
	console.log(`phone: ${contact.phone}`);
}

// Contacto Service: Contiene las operaciones para los contactos
var contactService = {
	// list(): Lista todos los contactos de directorio.json
	list: function(){
		// Lee el archivo
		fs.readFile('directorio.json', 'utf8', function(err,data){
			// Error
			if(err) {
				console.log("Error");
			}

			// Convierte el archivo a un objeto de JavaScript
			var contactsList = JSON.parse(data);
			// Mensaje con la cantidad de contactos
			console.log(`Mostrando ${contactsList.length} contacto(s)`);
			// Muestra la lista de los contactos
			for (var i = 0; i < contactsList.length; i++) {
				contactInfo(contactsList[i]);
			}
		});
	},
	// add(contact: Contacto para agregar): Agrega un nuevo contacto a directorio.json
	add: function(contact){
		// Lee el archivo
		fs.readFile('directorio.json', 'utf8', function(err,data){
			// Error
			if(err) {
				console.log("Error");
			}

			// Convierte el archivo a un objeto de JavaScript
			var contactsList = JSON.parse(data);
			// Concatena la lista de contactos con el nuevo contacto
			// y lo trasforma en una cadena para grabar en el directorio.json
			var data = JSON.stringify(_.concat(contactsList, contact));
			// Graba en el archivo
			fs.writeFile('directorio.json', data, function(err) {
				// Error
				if(err){
					console.log("Error");
				}
				// Mensaje de registro exitoso con la informacion del contacto
				console.log("Contacto registrado");
				contactInfo(contact);
			});
		});
	}
}

module.exports = contactService;