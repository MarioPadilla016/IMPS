const mysql = require('mysql2');
const { promisify } = require('util');
const { database } = require('./keys');
const { CONSTANTS } = require('../utils/utils');

const pool = mysql.createPool(database); // Se crea el pool de conexiones

// Iniciando conexion con la base de datos
pool.getConnection((error, conexion) => {
    // Validar si la conexion tiene algún tipo de error
    if (error) {
        // Validando codigos de error más comunes
        switch (error.code) {
            case CONSTANTS.PROTOCOL_CONNECTION_LOST:
                // Indica que la conexión con la base de datos está perdida
                console.error('DATABASE CONNECTION WAS CLOSED');
                break;
            case CONSTANTS.ER_CON_COUNT_ERROR:
                // Indica que existen demasiadas conexiones
                console.error('DATABASE HAS TOO MANY CONNECTIONS');
                break;
            case CONSTANTS.ER_ACCESS_DENIED_ERROR:
                // Indica que el acceso está denegado
                console.error('ACCESS DENIED FOR USER');
                break;
            default:
                console.error('Error de base de datos no encontrado');
                break;
        }
    }

    // Si la conexion es exitosa, imprimir un mensaje indicándolo
    if (conexion) {
        console.log('Conexión establecida con la base de datos');
        conexion.release();
    }

    return;
});

// Configurando PROMISIFY para permitir en cada consulta un async/await (promesas)
pool.query = promisify(pool.query);

module.exports = pool;
