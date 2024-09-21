// Este archivo será utilizado para configurar todas las rutas principales del sistema
const express = require('express');
const router = express.Router();
const estudianteRepository = require('../repositories/EstudianteRepository');

// Configuración de ruta inicial de la aplicación
router.get('/', async (request, response) => {
    // Probando conexión con la base de datos.
    const lstEstudiantes = await estudianteRepository.obtenerTodosLosEstudiantes();
    console.log('Listado: ', lstEstudiantes);

    response.send('Bienvenido al laboratorio de IMPS');
});

module.exports = router;
