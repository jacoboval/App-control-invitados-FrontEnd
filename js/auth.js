const API_URL = "http://localhost:8083";



document.getElementById("loginForm")
    .addEventListener("submit", async function (e) {

        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const response = await fetch(API_URL + "/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username: username,
                password: password
            })

        });

        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token);
            window.location.href = "admin.html";
        } else {

            alert("Login incorrecto");
        }
    });

