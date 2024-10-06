const pool = require('../config/databaseController');

module.exports = {

    // Consulta para obtener todas las carreras
    obtenerTodasLasCarreras: async () => {
        try {
            const result = await pool.query('SELECT * FROM carreras');
            return result;
        } catch (error) {
            console.error('Ocurrió un problema al consultar la lista de carreras: ', error);
        }
    },

    // Insertar una carrera
    insertarCarrera: async (carrera) => {
        try {
            const { nombre } = carrera;
            const result = await pool.query('INSERT INTO carreras (nombre) VALUES (?)', [nombre]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al insertar la carrera: ', error);
        }
    },

    // Actualizar una carrera
    actualizarCarrera: async (idcarrera, carrera) => {
        try {
            const { nombre } = carrera;
            const result = await pool.query('UPDATE carreras SET nombre = ? WHERE idcarrera = ?', [nombre, idcarrera]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al actualizar la carrera: ', error);
        }
    },

    // Eliminar una carrera
    eliminarCarrera: async (idcarrera) => {
        try {
            const result = await pool.query('DELETE FROM carreras WHERE idcarrera = ?', [idcarrera]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al eliminar la carrera', error);
        }
    }
};
