document.addEventListener("DOMContentLoaded", () => {
    const guardarPerfil = document.getElementById("guardarPerfil");
    const avatarOpciones = document.querySelectorAll(".avatar");

    // Cargar datos previos del almacenamiento local
    cargarPerfil();

    // Manejar selección de avatar
    avatarOpciones.forEach((avatar) => {
        avatar.addEventListener("click", () => {
            avatarOpciones.forEach((opcion) => opcion.classList.remove("seleccionado"));
            avatar.classList.add("seleccionado");
            localStorage.setItem("avatarSeleccionado", avatar.getAttribute("data-avatar"));
        });
    });

    guardarPerfil.addEventListener("click", () => {
        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const carrera = document.getElementById("carrera").value.trim();
        const avatarSeleccionado = localStorage.getItem("avatarSeleccionado") || "azul";

        if (!nombre || !apellido || !carrera) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const perfil = {
            nombre,
            apellido,
            carrera,
            avatar: avatarSeleccionado,
            puntos: 0,
            actividades: {
                realizadas: 0,
                noRealizadas: 0,
            },
        };

        localStorage.setItem("perfil", JSON.stringify(perfil));
        alert("¡Perfil guardado exitosamente!");
        cargarPerfil();
    });

    function cargarPerfil() {
        const perfilGuardado = localStorage.getItem("perfil");

        if (perfilGuardado) {
            const perfil = JSON.parse(perfilGuardado);
            document.getElementById("nombre").value = perfil.nombre || "";
            document.getElementById("apellido").value = perfil.apellido || "";
            document.getElementById("carrera").value = perfil.carrera || "";
            document.getElementById("totalPuntos").textContent = perfil.puntos || 0;
            document.getElementById("actividadesRealizadas").textContent = perfil.actividades.realizadas || 0;
            document.getElementById("actividadesPendientes").textContent = perfil.actividades.noRealizadas || 0;

            avatarOpciones.forEach((avatar) => {
                avatar.classList.remove("seleccionado");
                if (avatar.getAttribute("data-avatar") === perfil.avatar) {
                    avatar.classList.add("seleccionado");
                }
            });
        }
    }
});
