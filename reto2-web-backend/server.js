// server.js
var contactService = require('./contact.js');
var _ = require('lodash');

// -- Configuraacion del yargs
// Descripcion del parametro name
const contactName = {
	describe: 'Nombre del contacto',
  	demand: true,
  	alias: 'n'
};

// Descripcion del parametro phone
const contactPhone = {
	describe: 'Telefono del contacto',
  	demand: true,
  	alias: 't'
};

// Configuracion de los comandos
//  - list: Lista todos los contactos
//  - add: Añade un nuevo contacto
//  	-> Parms: 
//  		-- name: Nombre del contacto
//  		-- phone: Telefono del contacto
var argv = require('yargs')
		   .command('list','Lista todos los contactos')
		   .command('add', 'Añade un nuevo contacto',{
		   		name: contactName,
		   		phone: contactPhone
		   })
		   .argv;

// Recoge el comando actual
var command = argv._[0];

// Opciones de acuerdo al comando
if(command == 'list'){
	// Lista los contactos
	contactService.list();
} else if(command == "add") {
	// Añade un nuevo contacto
	contactService.add(
		{
			'name': argv.name, 
			'phone': _.toString(argv.phone)
		}
	);
}
