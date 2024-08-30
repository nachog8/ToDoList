require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

sequelize.sync().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
