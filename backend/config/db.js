const { Sequelize } = require('sequelize');

// Cargar variables de entorno
require('dotenv').config();

// Crear una nueva instancia de Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,      // Nombre de la base de datos
  process.env.DB_USER,      // Usuario de la base de datos
  process.env.DB_PASS,      // Contraseña del usuario
  {
    host: process.env.DB_HOST,  // Host de la base de datos (por ejemplo, 'localhost')
    dialect: 'mysql',           // Dialecto de la base de datos
  }
);

// Probar la conexión
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

module.exports = sequelize;
