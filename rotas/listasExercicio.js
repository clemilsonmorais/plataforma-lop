const express = require('express');
const router = express.Router();

const listaExercicioController = require('../controladores/listaExercicioController');
const { catchErrors } = require('../negocio/errorHandlers');

router.get('/listas', catchErrors(listaExercicioController.getListas));

router.get('/lista/adicionar', listaExercicioController.adicionarLista);

router.post('/lista/adicionar', catchErrors(listaExercicioController.criarLista));

router.get('/lista/:id', catchErrors(listaExercicioController.getLista));

module.exports = router;