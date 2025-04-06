document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("adminLoginForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const adminData = JSON.parse(localStorage.getItem("adminData")) || {};

        if (adminData.username === username && adminData.password === password) {
            alert("Успішна авторизація!");
            window.location.href = "index.html";
        } else {
            alert("Невірний логін або пароль.");
        }
    });

    function setAdminData() {
        if (!localStorage.getItem("adminData")) {
            const adminData = {
                username: "admin",
                password: "12345678"
            };
            localStorage.setItem("adminData", JSON.stringify(adminData));
        }
    }
    setAdminData();
});
