// Inicializar Supabase
const supabase = supabase.createClient(
    "https://tqhqpwzmasuwhxglihoj.supabase.co", // URL del proyecto
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxaHFwd3ptYXN1d2h4Z2xpaG9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3NTAzMzUsImV4cCI6MjA0ODMyNjMzNX0.IxleDNQ9az9eSQGhWuvMx-oJayG4kFIAu1xFGKXQA3Y" // Clave pública
);

// Evento para crear una cuenta
document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const cedula = document.getElementById('cedula').value.trim();
    const correo = document.getElementById('registerCorreo').value.trim();
    const contrasena = document.getElementById('registerContrasena').value.trim();
    const rol = document.getElementById('rol').value;

    if (!cedula || !correo || !contrasena || !rol) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const { data, error } = await supabase.from('usuarios').insert([
        {
            cedula,
            correo,
            contraseña: contrasena,
            rol
        }
    ]);

    if (error) {
        alert('Error al crear la cuenta: ' + error.message);
    } else {
        alert('Cuenta creada exitosamente.');
        window.location.href = 'perfil.html';
    }
});

// Evento para iniciar sesión
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const correo = document.getElementById('loginCorreo').value.trim();
    const contrasena = document.getElementById('loginContrasena').value.trim();

    if (!correo || !contrasena) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('correo', correo)
        .eq('contraseña', contrasena);

    if (error || data.length === 0) {
        alert('Correo o contraseña incorrectos.');
    } else {
        alert('Inicio de sesión exitoso.');
        window.location.href = 'perfil.html';
    }
});
