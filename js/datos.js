//const API_URL = "https://control-invitados-backend.onrender.com";
const form = document.getElementById("form-rsvp");
let enviado = false;

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (enviado) return;
    enviado = true;

    document.querySelector("button[type='submit']").disabled = true;

    const tokenAcceso = localStorage.getItem("invitation_token");

    const data = {
        nombre: document.getElementById("nombre").value,
        acompanantes: document.getElementById("acompanantes").value,
        asistencia: document.querySelector("input[name='asistencia']:checked").value,
        mensaje: document.getElementById("mensaje").value,
        tokenAcceso: tokenAcceso
    };

    const response = await fetch("https://app-control-invitados-backend.onrender.com/rsvp/confirmar", {                           
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        mostrarMensajeBonito();
    } else {
        mostrarError();
    }
});

function mostrarMensajeBonito() {
    document.getElementById("msg-success").classList.remove("d-none");
    form.classList.add("d-none");
}

function mostrarError() {
    document.getElementById("msg-error").classList.remove("d-none");
}
