document.addEventListener("DOMContentLoaded", function () {
    const seatsContainer = document.querySelector(".seats");
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    let selectedSeats = [];

    const ticketPrice = 100; // Ціна одного квитка

    // Генеруємо місця (8 рядів по 8 місць)
    for (let i = 1; i <= 64; i++) {
        const seat = document.createElement("div");
        seat.classList.add("seat");
        seat.dataset.seatNumber = i; // Номер місця
        seat.addEventListener("click", toggleSeatSelection);
        seatsContainer.appendChild(seat);
    }

    // Функція вибору/зняття вибору місця
    function toggleSeatSelection(event) {
        const seat = event.target;
        const seatNumber = seat.dataset.seatNumber;

        if (!seat.classList.contains("occupied")) {
            if (seat.classList.contains("selected")) {
                seat.classList.remove("selected");
                removeSeatFromCart(seatNumber);
            } else {
                seat.classList.add("selected");
                addSeatToCart(seatNumber);
            }
        }
    }

    // Додаємо місце в корзину
    function addSeatToCart(seatNumber) {
        selectedSeats.push(seatNumber);

        const listItem = document.createElement("li");
        listItem.classList.add("cart-item");
        listItem.dataset.seatNumber = seatNumber;
        listItem.innerHTML = `Місце ${seatNumber} - ${ticketPrice} грн 
            <button class="remove-btn">❌</button>`;

        cartItems.appendChild(listItem);

        updateTotalPrice();

        // Видалення з корзини
        listItem.querySelector(".remove-btn").addEventListener("click", function () {
            removeSeatFromCart(seatNumber);
            document.querySelector(`.seat[data-seat-number="${seatNumber}"]`).classList.remove("selected");
        });
    }

    // Видаляємо місце з корзини
    function removeSeatFromCart(seatNumber) {
        selectedSeats = selectedSeats.filter(seat => seat !== seatNumber);
        document.querySelector(`li[data-seat-number="${seatNumber}"]`).remove();
        updateTotalPrice();
    }

    // Оновлюємо загальну суму
    function updateTotalPrice() {
        totalPrice.textContent = selectedSeats.length * ticketPrice;
    }
});
