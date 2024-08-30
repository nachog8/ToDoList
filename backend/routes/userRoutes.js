const express = require('express');
const router = express.Router();

// Definir rutas para usuarios aquí
router.get('/', (req, res) => {
    res.send('Lista de usuarios');
});

module.exports = router;
