document.addEventListener("DOMContentLoaded", () => {
    const listaActividades = document.getElementById("listaActividades");
    const actividadAsignada = document.getElementById("actividadAsignada");
    const btnAceptarActividad = document.getElementById("btnAceptarActividad");
    const inputEvidencia = document.getElementById("inputEvidencia");
    const btnVerMisPuntos = document.getElementById("btnVerMisPuntos");

    const actividadesUniversitarias = Array.from({ length: 30 }, (_, i) => ({
        nombre: `Universitaria ${i + 1}`,
        descripcion: `Descripción de la actividad Universitaria ${i + 1}.`,
        puntos: Math.floor(Math.random() * 100) + 1,
        estado: "pendiente",
    }));

    const actividadesExtracurriculares = Array.from({ length: 30 }, (_, i) => ({
        nombre: `Extracurricular ${i + 1}`,
        descripcion: `Descripción de la actividad Extracurricular ${i + 1}.`,
        puntos: Math.floor(Math.random() * 100) + 1,
        estado: "pendiente",
    }));

    let actividadesActuales = [];
    let actividadSeleccionada = null;

    function cargarActividades(tipo) {
        actividadesActuales = tipo === "universitarias" ? actividadesUniversitarias : actividadesExtracurriculares;

        listaActividades.innerHTML = "";
        actividadesActuales.forEach((actividad, index) => {
            const div = document.createElement("div");
            div.className = `actividad ${actividad.estado}`;
            div.textContent = actividad.nombre;
            div.addEventListener("click", () => asignarActividad(actividad, index));
            listaActividades.appendChild(div);
        });
    }

    function asignarActividad(actividad, index) {
        actividadSeleccionada = index;
        actividadAsignada.innerHTML = `
            <h4>${actividad.nombre}</h4>
            <p>${actividad.descripcion}</p>
            <p>Puntos: ${actividad.puntos}</p>
        `;
        inputEvidencia.value = "";
        btnAceptarActividad.style.display = "block";
    }

    btnAceptarActividad.addEventListener("click", () => {
        if (!inputEvidencia.value) {
            alert("Por favor, suba un archivo como evidencia antes de aceptar la actividad.");
            return;
        }

        const actividad = actividadesActuales[actividadSeleccionada];
        actividad.estado = "verificacion";
        cargarActividades(actividadesActuales === actividadesUniversitarias ? "universitarias" : "extracurriculares");
        alert("Evidencia enviada. Actividad marcada como 'En Proceso de Verificación'.");
    });

    btnVerMisPuntos.addEventListener("click", () => {
        localStorage.setItem("actividades", JSON.stringify(actividadesActuales));
        window.location.href = "mispuntos.html";
    });

    cargarActividades("universitarias");
});
