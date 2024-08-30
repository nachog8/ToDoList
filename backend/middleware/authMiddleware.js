const jwt = require('jsonwebtoken');

// Middleware de autenticación
const authMiddleware = (req, res, next) => {
    // Obtener el token del encabezado de autorización
    const token = req.header('Authorization');

    // Verificar si el token existe
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
    }

    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Agregar el usuario decodificado al objeto de solicitud
        req.user = decoded;

        // Continuar con la siguiente función de middleware
        next();
    } catch (err) {
        // Responder con un error si el token no es válido
        res.status(400).json({ message: 'Token no es válido.' });
    }
};

module.exports = authMiddleware;
