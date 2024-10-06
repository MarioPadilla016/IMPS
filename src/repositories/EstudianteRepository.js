const pool = require('../config/databaseController');

module.exports = {

    // Consulta para obtener todos los estudiantes
    obtenerTodosLosEstudiantes: async () => {
        try {
            const result = await pool.query('SELECT * FROM estudiantes');
            return result;
        } catch (error) {
            console.error('Ocurrió un problema al consultar la lista de estudiantes: ', error);
        }
    },

    // Insertar un estudiante
    insertarEstudiante: async (estudiante) => {
        try {
            const { nombre, apellido, email, idcarrera, usuario } = estudiante;
            const result = await pool.query('INSERT INTO estudiantes (nombre, apellido, email, idcarrera, usuario) VALUES (?, ?, ?, ?, ?)', [nombre, apellido, email, idcarrera, usuario]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al insertar el estudiante: ', error);
        }
    },

    // Actualizar un estudiante
    actualizarEstudiante: async (idestudiante, estudiante) => {
        try {
            const { nombre, apellido, email, idcarrera, usuario } = estudiante;
            const result = await pool.query('UPDATE estudiantes SET nombre = ?, apellido = ?, email = ?, idcarrera = ?, usuario = ? WHERE idestudiante = ?', [nombre, apellido, email, idcarrera, usuario, idestudiante]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al actualizar el estudiante: ', error);
        }
    },

    // Eliminar un estudiante
    eliminarEstudiante: async (idestudiante) => {
        try {
            const result = await pool.query('DELETE FROM estudiantes WHERE idestudiante = ?', [idestudiante]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al eliminar el registro', error);
        }
    }
};
