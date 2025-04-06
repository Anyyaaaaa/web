document.addEventListener("DOMContentLoaded", function () {
    const seatsContainer = document.querySelector(".seats");
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    let selectedSeats = [];
    const ticketPrice = 100;
    const movieName = localStorage.getItem("selectedMovie") || "Не вибрано";
    document.getElementById("movie-title").textContent = movieName;

    let cartData = {
        movie: movieName,
        seats: [],
        total: 0
    };

    for (let i = 1; i <= 64; i++) {
        const seat = document.createElement("div");
        seat.classList.add("seat");
        seat.dataset.seatNumber = i;
        seat.addEventListener("click", toggleSeatSelection);
        seatsContainer.appendChild(seat);
    }

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

    function addSeatToCart(seatNumber) {
        selectedSeats.push(seatNumber);

        const listItem = document.createElement("li");
        listItem.classList.add("cart-item");
        listItem.dataset.seatNumber = seatNumber;
        listItem.innerHTML = `Місце ${seatNumber} - ${ticketPrice} грн 
            <button class="remove-btn">❌</button>`;

        cartItems.appendChild(listItem);
        updateTotalPrice();

        listItem.querySelector(".remove-btn").addEventListener("click", function () {
            removeSeatFromCart(seatNumber);
            document.querySelector(`.seat[data-seat-number="${seatNumber}"]`).classList.remove("selected");
        });
    }

    function removeSeatFromCart(seatNumber) {
        selectedSeats = selectedSeats.filter(seat => seat !== seatNumber);
        const listItem = document.querySelector(`li.cart-item[data-seat-number="${seatNumber}"]`);
        if (listItem) {
            listItem.remove();
        }
        updateTotalPrice();
    }

    function updateTotalPrice() {
        totalPrice.textContent = selectedSeats.length * ticketPrice;
    }

    document.getElementById("checkout").addEventListener("click", function () {
        if (selectedSeats.length === 0) {
            alert("Виберіть місця перед оформленням замовлення!");
            return;
        }

        cartData = {
            movie: movieName,
            seats: selectedSeats,
            total: selectedSeats.length * ticketPrice
        };
        alert("Замовлення оформлено! Дані збережено у JSON-змінну.");
        console.log("Дані замовлення:", cartData);
    });
});
