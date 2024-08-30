document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const username = document.getElementById('nombre_usuario').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // Validar campos en blanco
        if (username === '' || email === '' || password === '') {
            showAlert('danger', 'El nombre de usuario, el email y la contraseña no pueden estar en blanco.');
            return;
        }

        try {
            const checkResponse = await fetch('http://localhost:3000/api/auth/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre_usuario: username, email }),
            });

            const checkData = await checkResponse.json();

            if (checkData.usernameExists) {
                showAlert('danger', 'Nombre de usuario ya está en uso');
                return;
            }

            if (checkData.emailExists) {
                showAlert('danger', 'Email ya está en uso');
                return;
            }

            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre_usuario: username, email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                window.location.href = 'login.html';
            } else {
                const errorData = await response.json();
                showAlert('danger', errorData.error || 'Error al registrarse');
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
