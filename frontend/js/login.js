document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const username = document.getElementById('nombre_usuario').value.trim();
        const password = document.getElementById('password').value.trim();

        // Validar campos en blanco
        if (username === '' || password === '') {
            showAlert('danger', 'El nombre de usuario y la contraseña no pueden estar en blanco.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre_usuario: username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                window.location.href = 'main.html';
            } else {
                const errorData = await response.json();
                showAlert('danger', errorData.error || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error:', error);
            showAlert('danger', 'Error de red');
        }
    });

    function showAlert(type, message) {
        const alertContainer = document.getElementById('alert-container');
        alertContainer.innerHTML = ''; // Limpiar alertas previas

        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        alertContainer.appendChild(alertDiv);

        setTimeout(() => alertDiv.remove(), 5000);
    }
});
