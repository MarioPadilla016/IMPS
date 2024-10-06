const express = require('express');
const router = express.Router();
const queries = require('../repositories/EstudianteRepository');

// Endpoint para mostrar todos los estudiantes
router.get('/', async (request, response) => {
    const estudiantes = await queries.obtenerTodosLosEstudiantes();
    response.render('estudiantes/listado', { estudiantes }); // Mostramos el listado de estudiantes
});

// Endpoint que permite mostrar el formulario para agregar un nuevo estudiante
router.get('/agregar', async (request, response) => {
    response.render('estudiantes/agregar');
});

// Endpoint para insertar un estudiante
router.post('/agregar', async (request, response) => {
    const { nombre, apellido, email, idcarrera, usuario } = request.body;
    const nuevoEstudiante = { nombre, apellido, email, idcarrera, usuario };
    const resultado = await queries.insertarEstudiante(nuevoEstudiante);
    if (resultado) {
        console.log('Estudiante agregado con éxito');
    }
    response.redirect('/estudiantes');
});

// Endpoint que permite mostrar el formulario para editar un estudiante
router.get('/editar/:idestudiante', async (request, response) => {
    const { idestudiante } = request.params;
    const estudiante = await queries.obtenerTodosLosEstudiantes(idestudiante); // Necesitas un método para obtener un estudiante por ID
    response.render('estudiantes/editar', { estudiante });
});

// Endpoint para actualizar un estudiante
router.post('/editar/:idestudiante', async (request, response) => {
    const { idestudiante } = request.params;
    const { nombre, apellido, email, idcarrera, usuario } = request.body;
    const estudianteActualizado = { nombre, apellido, email, idcarrera, usuario };
    const resultado = await queries.actualizarEstudiante(idestudiante, estudianteActualizado);
    if (resultado) {
        console.log('Estudiante actualizado con éxito');
    }
    response.redirect('/estudiantes');
});

// Endpoint que permite eliminar un estudiante
router.get('/eliminar/:idestudiante', async (request, response) => {
    const { idestudiante } = request.params;
    const resultado = await queries.eliminarEstudiante(idestudiante);
    
    if (resultado > 0) {
        console.log('Eliminado con éxito');
    }
    response.redirect('/estudiantes');
});

module.exports = router;
