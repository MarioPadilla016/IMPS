const express = require('express');
const router = express.Router();
const queries = require('../repositories/CarreraRepository');

// Endpoint para mostrar todas las carreras
router.get('/', async (request, response) => {
    const carreras = await queries.obtenerTodasLasCarreras();
    response.render('carreras/listado', { carreras }); // Mostramos el listado de carreras
});

// Endpoint que permite mostrar el formulario para agregar una nueva carrera
router.get('/agregar', async (request, response) => {
    response.render('carreras/agregar');
});

// Endpoint para insertar una nueva carrera
router.post('/agregar', async (request, response) => {
    const { nombre } = request.body;
    const nuevaCarrera = { nombre };
    const resultado = await queries.insertarCarrera(nuevaCarrera);
    if (resultado) {
        console.log('Carrera agregada con éxito');
    }
    response.redirect('/carreras');
});

// Endpoint que permite mostrar el formulario para editar una carrera
router.get('/editar/:idcarrera', async (request, response) => {
    const { idcarrera } = request.params;
    const carreras = await queries.obtenerTodasLasCarreras(idcarrera); // Necesitas un método para obtener una carrera por ID
    response.render('carreras/editar', { carreras });
});

// Endpoint para actualizar una carrera
router.post('/editar/:idcarrera', async (request, response) => {
    const { idcarrera } = request.params;
    const { nombre } = request.body;
    const carreraActualizada = { nombre };
    const resultado = await queries.actualizarCarrera(idcarrera, carreraActualizada);
    if (resultado) {
        console.log('Carrera actualizada con éxito');
    }
    response.redirect('/carreras');
});

// Endpoint que permite eliminar una carrera
router.get('/eliminar/:idcarrera', async (request, response) => {
    const { idcarrera } = request.params;
    const resultado = await queries.eliminarCarrera(idcarrera);
    
    if (resultado > 0) {
        console.log('Carrera eliminada con éxito');
    }
    response.redirect('/carreras');
});

module.exports = router;
