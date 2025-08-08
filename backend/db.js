const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'BD_EPmexico',
    port: 3306

});

connection.connect(error => {
    if(error) {
          console.error('Error de conexión a la BD :(', error);
          return;
    }
    console.log('Conectado a la base de datos MySQL :)');
});

module.exports = connection;
