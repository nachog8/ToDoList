const Usuario = require('../models/User');

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        // Obtener todos los usuarios de la base de datos
        const users = await Usuario.findAll();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar el usuario en la base de datos
        const user = await Usuario.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nombre_usuario, email, password } = req.body;

    try {
        // Buscar el usuario en la base de datos
        const user = await Usuario.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Actualizar el usuario
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        if (nombre_usuario) user.nombre_usuario = nombre_usuario;
        if (email) user.email = email;

        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar y eliminar el usuario en la base de datos
        const user = await Usuario.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        await user.destroy();
        res.status(204).end(); // No content
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };
