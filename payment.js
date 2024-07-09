
document.addEventListener('DOMContentLoaded', () => {
    const paymentItemsContainer = document.getElementById('paymentItems');
    const totalElement = document.getElementById('total');
    const paymentForm = document.getElementById('paymentForm');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Function to load items in payment form
    function loadPaymentItems() {
        paymentItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cartItems.forEach(item => {
            const itemTotal = parseFloat(item.price) * parseInt(item.quantity);
            totalPrice += itemTotal;

            const itemDiv = document.createElement('div');
            itemDiv.classList.add('payment-item');
            itemDiv.innerHTML = `
                <img src="foto/${item.image}" alt="${item.name}" class="product-image-small">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>${formatCurrency(item.price)}</p>
                    <p>Jumlah: ${item.quantity}</p>
                    
                </div>
            `;
            paymentItemsContainer.appendChild(itemDiv);
        });

        totalElement.textContent = `Total: ${formatCurrency(totalPrice)}`;
    }

    // Function to format currency
    function formatCurrency(amount) {
        return `Rp ${amount.toFixed(2)}`;
    }

    // Event listener for form submission
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Perform payment processing here (e.g., send data to server)
        alert('Pembayaran berhasil! Terima kasih telah berbelanja.');
    
        // Optional: Clear cartItems after successful payment
        localStorage.removeItem('cartItems');
        loadPaymentItems(); // Reload items to reflect empty cart
    
        // Redirect to index.html after successful payment
        window.location.href = 'index.html';
    });
    

    // Initial load of payment items
    loadPaymentItems();
});
