//const API_URL = "https://control-invitadosbackend.onrender.com";
const API_URL = "http://localhost:8083";
const token = localStorage.getItem("token");

async function cargarInvitados() {
    const response = await fetch(`${API_URL}/admin/listarInvitados`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    });
    const invitados = await response.json();

    // Dashboard
    /*
    document.getElementById("dash-total").innerText = invitados.length;
    document.getEleymentById("dash-confirmados").innerText = invitados.filter(i => i.confirmado).length;
    document.getElementById("dash-pendientes").innerText = invitados.filter(i => !i.confirmado).length;
     */

    /**  update 27/01/2026**/

    // ===== PERSONAS =====
    const totalPersonas = invitados.length;
    const personasConfirmadas = invitados.filter(i => i.confirmado).length;
    const personasPendientes = invitados.filter(i => !i.confirmado).length;

    document.getElementById("dash-personas-total").innerText = totalPersonas;
    document.getElementById("dash-personas-confirmados").innerText = personasConfirmadas;
    document.getElementById("dash-personas-pendientes").innerText = personasPendientes;

    // ===== PASES =====
    let totalPases = 0;
    let pasesConfirmados = 0;
    let pasesDisponibles = 0;
    let pasesDisponibilidad = 100;

    invitados.forEach(i => {
        totalPases += i.acompanantes;

        if (i.confirmado) {
            pasesConfirmados += i.acompanantes;
        } else {
            pasesDisponibles += i.acompanantes;
        }
    });

    let pasesSinAsignar = pasesDisponibilidad - totalPases;

    document.getElementById("dash-pases-total").innerText = totalPases;
    document.getElementById("dash-pases-confirmados").innerText = pasesConfirmados;
    document.getElementById("dash-pases-disponibles").innerText = pasesDisponibles;
    document.getElementById("dash-pases-disponibilidad").innerText = pasesDisponibilidad;
    document.getElementById("dash-pases-sin-asignar").innerText = pasesSinAsignar;

    // 🔥 COLOR DINÁMICO
    if (pasesSinAsignar < 0) {
        document.getElementById("dash-pases-sin-asignar").style.color = "red";
    }

    /** * end update */
    const tabla = document.getElementById("tabla-invitados");
    tabla.innerHTML = "";

    invitados.forEach((inv, index) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${inv.nombre}</td>
            <td>${inv.acompanantes}</td>
            <td>${inv.mesa}</td>
            <td>${inv.confirmado ? "✔️ Sí" : "❌ No"}</td>
           

            <td>
                <button class="btn btn-primary btn-sm me-2" onclick="copiarEnlace('${inv.tokenAcceso}')">
                    <i class="bi bi-link-45deg"></i>
                </button>

                <button class="btn btn-success btn-sm me-2" onclick="enviarWhatsapp('${inv.nombre}','${inv.tokenAcceso}')">
                    <i class="bi bi-whatsapp"></i>
                </button>

                <!--<button class="btn btn-warning btn-sm" onclick="regenerarToken(${inv.id})">
                    <i class="bi bi-arrow-repeat"></i>
                </button>!-->
            </td>
        `;

        tabla.appendChild(fila);
    });
}

/* COPIAR ENLACE */
function copiarEnlace(token) {
    const url = `http://localhost:8083/index.html?t=${token}`;
    navigator.clipboard.writeText(url);
    //alert("Enlace copiado:\n" + url);
    navigator.clipboard.writeText(url);

    const btn = event.target.closest("button");
    btn.innerHTML = "✔️";

    setTimeout(() => {
        btn.innerHTML = '<i class="bi bi-link-45deg"></i>';
    }, 1500);
}

/* ENVIAR WHATSAPP */
function enviarWhatsapp(nombre, token) {
    const url = `http://localhost:8083/index.html?t=${token}`;
    const mensaje = `Hola ${nombre}, te compartimos tu invitación:\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(mensaje)}`, "_blank");
}

/* REGENERAR TOKEN */
async function regenerarToken(id) {
    if (!confirm("¿Regenerar token para este invitado?")) return;

    await fetch(`${API_URL}/admin/regenerar/${id}`, { method: "PUT" });
    alert("Token regenerado.");
    cargarInvitados();
}

/* EXPORTAR A EXCEL */
document.getElementById("btn-exportar").addEventListener("click", async () => {
    //const response = await fetch(`http://localhost:8083/admin/listarInvitados`);
    const response = await fetch(`${API_URL}/admin/listarInvitados`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    const invitados = await response.json();

    let csv = "Nombre,Pases,Confirmado,Token\n";

    invitados.forEach(i => {
        csv += `${i.nombre},${i.acompanantes},${i.confirmado},${i.tokenAcceso}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "lista_invitados.csv";
    a.click();
});

cargarInvitados();
