const express = require('express');
const router = express.Router();

// Definir rutas para tareas aquí
router.get('/', (req, res) => {
    res.send('Lista de tareas');
});

module.exports = router;
