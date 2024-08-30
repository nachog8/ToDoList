const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/User');

// Registrar un nuevo usuario
const registerUser = async (req, res) => {
    const { nombre_usuario, email, password } = req.body;

    try {
        const existingUser = await Usuario.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Usuario.create({
            nombre_usuario,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ id: user.id_usuario, username: user.nombre_usuario }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
};


// Iniciar sesión de un usuario
const loginUser = async (req, res) => {
    const { nombre_usuario, password } = req.body;

    try {
        // Buscar el usuario en la base de datos por nombre_usuario
        const user = await Usuario.findOne({ where: { nombre_usuario } });
        if (!user) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        // Comparar la contraseña proporcionada con la contraseña hasheada en la base de datos
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        // Generar un token JWT
        const token = jwt.sign({ id: user.id_usuario, username: user.nombre_usuario }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Responder con el token
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

// Verificar existencia de usuario y correo electrónico
const checkUser = async (req, res) => {
    const { nombre_usuario, email } = req.body;

    try {
        const usernameExists = await Usuario.findOne({ where: { nombre_usuario } });
        const emailExists = await Usuario.findOne({ where: { email } });

        res.json({
            usernameExists: !!usernameExists,
            emailExists: !!emailExists,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

module.exports = { registerUser, loginUser, checkUser };
