const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const userRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(express.json());

// Configurar CORS
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Aquí pones el origen de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Usar los enrutadores como middleware
app.use('/api/auth', userRoutes);
app.use('/api/tasks', taskRoutes);

app.post('/api/tasks', (req, res) => {
    // Lógica para manejar la solicitud POST
    res.status(201).json({ message: 'Tarea creada' });
});

sequelize.sync().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
