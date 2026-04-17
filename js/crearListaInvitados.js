const API_URL = "https://app-control-invitados-backend.onrender.com";
//const API_URL = "http://localhost:8081";
const token = localStorage.getItem("token");

document.getElementById("form-crear-lista-invitados").addEventListener("submit", async function (e) {
    e.preventDefault();

    const btn = document.querySelector("button[type='submit']");
    const msgSuccess = document.getElementById("msg-success");
    const msgError = document.getElementById("msg-error");

    msgSuccess.classList.add("d-none");
    msgError.classList.add("d-none");

    btn.disabled = true;
    btn.innerText = "Enviando...";

    try {
        const data = {
            nombre: document.getElementById("nombreinvitado").value,
            acompanantes: parseInt(document.getElementById("acompanantesinvitado").value) || 0,
            telefono: document.getElementById("telefonoinvitado").value,
        };

        const response = await fetch(`${API_URL}/admin`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            msgSuccess.classList.remove("d-none");

            // limpiar formulario
            document.getElementById("form-crear-lista-invitados").reset();
        } else {
            msgError.classList.remove("d-none");
        }

    } catch (error) {
        msgError.classList.remove("d-none");
    }

    btn.disabled = false;
    btn.innerText = "Crear Invitados";
});
