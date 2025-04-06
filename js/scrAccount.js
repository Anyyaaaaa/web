document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".register-btn").addEventListener("click", function () {
        window.location.href = "register.html";
    });

    document.getElementById("adminLoginForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const adminData = {
            username: "admin",
            password: "12345678",
            role: "admin"
        };

        if (username === adminData.username && password === adminData.password) {
            localStorage.setItem("isAdmin", "true");
            localStorage.setItem("currentUser", JSON.stringify(adminData));
            alert("Успішна авторизація як адміністратор!");
            window.location.href = "index.html";
            return;
        }

        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            localStorage.setItem("isAdmin", "false");
            localStorage.setItem("currentUser", JSON.stringify(user));
            alert("Вхід успішний!");
            window.location.href = "index.html";
        } else {
            alert("Невірний логін або пароль.");
        }
    });
});
