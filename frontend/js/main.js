document.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/tasks', {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
            const data = await response.json();
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = ''; // Limpiar la lista de tareas antes de agregar nuevas
            data.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task.name;
                taskList.appendChild(li);
            });
        } else {
            const errorData = await response.json();
            showAlert('danger', errorData.error || 'Failed to fetch tasks');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('danger', 'An error occurred while fetching tasks.');
    }
});

// Manejo del formulario de tareas y cierre de sesión
document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const logoutBtn = document.getElementById('logout-btn');

    // Manejar el envío del formulario para agregar tareas
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const task = taskInput.value.trim();

        if (task) {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.textContent = task;

            taskList.appendChild(listItem);

            // Limpiar la entrada de texto
            taskInput.value = '';
        } else {
            alert('Task cannot be empty.');
        }
    });

});

document.addEventListener('DOMContentLoaded', function () {
    const logoutBtn = document.getElementById('logout-btn');
    const confirmLogoutBtn = document.getElementById('confirm-logout-btn');

    // Mostrar el modal cuando se hace clic en "Cerrar Sesión"
    logoutBtn.addEventListener('click', function () {
        const logoutModal = new bootstrap.Modal(document.getElementById('logoutModal'));
        logoutModal.show();
    });

    // Manejar la confirmación de cierre de sesión
    confirmLogoutBtn.addEventListener('click', function () {
        // Eliminar el token de autenticación
        localStorage.removeItem('token');
        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = 'login.html';
    });
});

