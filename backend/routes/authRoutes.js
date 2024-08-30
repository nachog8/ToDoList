const express = require('express');
const router = express.Router();
const { registerUser, loginUser, checkUser } = require('../controllers/authController');
const jwt = require('jsonwebtoken');
const { Task } = require('../models/Task');

// Ruta de registro
router.post('/register', registerUser);

// Ruta de inicio de sesión
router.post('/login', loginUser);

// Ruta para verificar existencia de usuario y correo electrónico
router.post('/check', checkUser);

router.get('/tasks', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, 'tu_clave_secreta'); // Asegúrate de que la clave sea la misma que usas para firmar el token
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

module.exports = router;
