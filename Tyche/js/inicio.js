document.addEventListener("DOMContentLoaded", () => {
    const puntosTotales = document.getElementById("puntosTotales");
    const listaActividades = document.getElementById("listaActividades");

    let actividades = JSON.parse(localStorage.getItem("actividades")) || [];
    let totalPuntos = 0;

    actividades.forEach((actividad) => {
        const div = document.createElement("div");
        div.className = `actividad ${actividad.estado}`;
        div.textContent = `${actividad.nombre} - ${actividad.estado === "completada" ? "Completado" : actividad.estado === "verificacion" ? "En Verificación" : "Pendiente"}`;
        listaActividades.appendChild(div);

        // Sumar puntos si está completada
        if (actividad.estado === "completada") {
            totalPuntos += actividad.puntos;
        }
    });

    // Mostrar puntos totales
    puntosTotales.textContent = totalPuntos;

    // Guardar el total de puntos para sincronización con perfil.html
    localStorage.setItem("puntosTotales", totalPuntos);
});
