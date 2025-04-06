document.addEventListener("DOMContentLoaded", function () {
    const cartTable = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    const cart = JSON.parse(localStorage.getItem("cart")) || { seats: [], total: 0 };

    if (cart.seats.length === 0) {
        cartTable.innerHTML = "<tr><td colspan='4'>Кошик порожній</td></tr>";
        totalPrice.textContent = "0 грн";
        return;
    }

    cart.seats.forEach(seat => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${cart.movie}</td>
            <td>Місце ${seat}</td>
            <td>100 грн</td>
            <td><button class="remove-btn" data-seat="${seat}">❌</button></td>
        `;
        cartTable.appendChild(row);
    });
    totalPrice.textContent = `${cart.total} грн`;

    document.querySelector("button[onclick='clearCart()']").addEventListener("click", function () {
        localStorage.removeItem("cart");
        window.location.reload();
    });

    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", function () {
            const seatToRemove = button.dataset.seat;
            cart.seats = cart.seats.filter(seat => seat !== seatToRemove);
            cart.total = cart.seats.length * 100;

            if (cart.seats.length === 0) {
                localStorage.removeItem("cart");
            } else {
                localStorage.setItem("cart", JSON.stringify(cart));
            }
            window.location.reload();
        });
    });
});
