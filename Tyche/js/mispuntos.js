document.addEventListener("DOMContentLoaded", () => {
    const puntosTotales = document.getElementById("puntosTotales");
    const listaTransacciones = document.getElementById("listaTransacciones");

    let actividades = JSON.parse(localStorage.getItem("actividades")) || [];
    let totalPuntos = 0;

    actividades.forEach((actividad) => {
        const tr = document.createElement("tr");

        // Nombre de la actividad
        const tdNombre = document.createElement("td");
        tdNombre.textContent = actividad.nombre;

        // Fecha
        const tdDia = document.createElement("td");
        tdDia.textContent = new Date().toLocaleDateString();

        // Puntos
        const tdPuntos = document.createElement("td");
        tdPuntos.textContent = actividad.puntos > 0 ? `+ ${actividad.puntos}` : actividad.puntos;

        // Estado
        const tdEstado = document.createElement("td");
        tdEstado.textContent =
            actividad.estado === "completada" ? "Completado" : actividad.estado === "verificacion" ? "En Verificación" : "Pendiente";

        // Sumar puntos si está completada
        if (actividad.estado === "completada") {
            totalPuntos += actividad.puntos;
        }

        tr.appendChild(tdNombre);
        tr.appendChild(tdDia);
        tr.appendChild(tdPuntos);
        tr.appendChild(tdEstado);

        listaTransacciones.appendChild(tr);
    });

    // Mostrar puntos totales
    puntosTotales.textContent = totalPuntos;
});
