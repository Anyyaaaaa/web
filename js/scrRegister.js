document.querySelector(".register-btn").addEventListener("click", function () {
    window.location.href = "account.html";
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("adminLoginForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        let users = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = users.some(user => user.username === username);

        if (userExists) {
            alert("Користувач з таким логіном вже існує!");
            return;
        }

        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Реєстрація пройшла успішно!");
        window.location.href = "account.html";
    });
});

