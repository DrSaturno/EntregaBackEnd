const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // 
    database: 'moviesdb'
});

connection.connect((err) => {
    if (err) {
        console.log('Error en la conexión a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos');
});

module.exports = connection;
