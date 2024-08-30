const Task = require('../models/Task');

// Obtener todas las tareas
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

// Obtener una tarea por ID
const getTaskById = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json(task);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

// Crear una nueva tarea
const createTask = async (req, res) => {
    const { id_usuario, titulo, descripcion, estado } = req.body;

    try {
        const newTask = await Task.create({
            id_usuario,
            titulo,
            descripcion,
            estado,
            fecha_creacion: new Date(),
            fecha_modificacion: new Date()
        });
        res.status(201).json(newTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

// Actualizar una tarea
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, estado } = req.body;

    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        task.titulo = titulo || task.titulo;
        task.descripcion = descripcion || task.descripcion;
        task.estado = estado || task.estado;
        task.fecha_modificacion = new Date();

        await task.save();
        res.json(task);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

// Eliminar una tarea
const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        await task.destroy();
        res.status(204).end();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
