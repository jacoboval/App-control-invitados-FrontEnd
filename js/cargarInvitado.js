const API_URL = "http://localhost:8083";                 
const TOKEN_STORAGE_KEY = 'invitation_token';
const params = new URLSearchParams(window.location.search);
const token = params.get("t");
//const tokens = localStorage.getItem("token"); //  almacena toke nde  d
if (!token) {
    console.error("No se encontró token en la URL");
}

async function cargarDatosInvitado() {
    try {
        const response = await fetch(`${API_URL}/admin/buscar/${token}`);

        if (!response.ok) {
            throw new Error("Invitado no encontrado");
        }

        const invitado = await response.json();

         /*async function init() {

            const res = await fetch("http://localhost:8083/admin/buscar/" + token);
            const data = await res.json();

            // 🔥 cargar template dinámico
            const script = document.createElement("script");
            script.src = `templates/${data.template}.js`;

            script.onload = () => {
                renderTemplate(data); // 👈 función del template
            };

            document.body.appendChild(script);
        }*/


        // Guardar token
        localStorage.setItem(TOKEN_STORAGE_KEY, token);

        // Rellenar tarjetas
        document.getElementById("nombre-invitado").innerHTML = invitado.nombre;
        document.getElementById("pases-invitado").innerHTML = "Pases: " + invitado.acompanantes;
        document.getElementById("mesa-invitado").innerHTML = "Mesa: " + invitado.mesa;

        // Rellenar formulario
        document.getElementById("nombre").value = invitado.nombre;
        document.getElementById("acompanantes").value = invitado.acompanantes;

        // SI YA CONFIRMÓ → BLOQUEAR FORMULARIO
        if (invitado.confirmado) {
            deshabilitarFormulario();
        }

    } catch (error) {
        console.error(error);
    }
}

function deshabilitarFormulario() {
    document.getElementById("form-rsvp").classList.add("d-none");

    const msg = document.getElementById("msg-success");
    msg.classList.remove("d-none");
    msg.innerHTML = "Ya has confirmado tu asistencia, Recuerda... se puntual para no perderte de ningún momento de esta gran celebración.";
}

cargarDatosInvitado();

