document.addEventListener('DOMContentLoaded', () => {
    const cartItemsList = document.querySelector('#cart-items');
    const totalElement = document.querySelector('#total');
    const katalog = document.querySelector('#katalog');

    // Function to load cart items from localStorage
    function loadCartItems() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItemsList.innerHTML = ''; // Clear existing items

        cartItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.classList.add('item');
            listItem.innerHTML = `
                <div class="item-info">
                    <img src="foto/${item.image}" alt="${item.name}" class="product-image-small"> <!-- Added class 'product-image-small' -->
                    <div class="item-details">
                        <h1>${item.name}</h1>
                        <h2>${item.quantity}X</h2>
                        <h2>${formatCurrency(item.price)}</h2>
                        
                    </div>
                </div>
                <div class="item-actions">
                    <button class="decrease-btn" data-name="${item.name}">-</button>
                    <div class="quantity">${item.quantity}</div>
                    <button class="increase-btn" data-name="${item.name}">+</button>
                    <button class="delete-btn" data-name="${item.name}">Hapus</button>
                    <button class="buy-btn">Check Out</button>
                </div>
            `;
            cartItemsList.appendChild(listItem);

            // Add event listeners for increase, decrease, and delete buttons
            listItem.querySelector('.increase-btn').addEventListener('click', () => increaseQuantity(item.name));
            listItem.querySelector('.decrease-btn').addEventListener('click', () => decreaseQuantity(item.name));
            listItem.querySelector('.delete-btn').addEventListener('click', () => deleteItem(item.name));
        });

        const totalPrice = calculateTotalPrice(cartItems);
        totalElement.textContent = `Total: ${formatCurrency(totalPrice)}`;
    }

    // Function to calculate total price
    function calculateTotalPrice(cartItems) {
        return cartItems.reduce((total, item) => {
            const itemPrice = parseFloat(item.price);
            const itemQuantity = parseInt(item.quantity);

            if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
                return total + (itemPrice * itemQuantity);
            } else {
                console.error(`Invalid price or quantity for item: ${item.name}`);
                return total;
            }
        }, 0);
    }

    // Function to format currency
    function formatCurrency(amount) {
        return `Rp ${amount.toFixed(2)}`;
    }

    // Function to add item to cart
    function addItemToCart(name, price, image) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingItemIndex = cartItems.findIndex(item => item.name === name);

        if (existingItemIndex > -1) {
            cartItems[existingItemIndex].quantity += 1;
        } else {
            const newItem = {
                name: name,
                price: price,
                quantity: 1,
                image: image // Ensure 'image' property is correctly set
            };
            cartItems.push(newItem);
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        loadCartItems();
    }

    // Function to increase quantity of an item
    function increaseQuantity(name) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingItem = cartItems.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            loadCartItems();
        }
    }

    // Function to decrease quantity of an item
    function decreaseQuantity(name) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingItem = cartItems.find(item => item.name === name);

        if (existingItem && existingItem.quantity > 1) {
            existingItem.quantity -= 1;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            loadCartItems();
        }
    }

    // Function to delete an item from cart
    function deleteItem(name) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems = cartItems.filter(item => item.name !== name);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        loadCartItems();
    }

    // Event delegation to handle "BELI" button clicks
    katalog.addEventListener('click', (e) => {
        if (e.target.classList.contains('beli-btn')) {
            const name = e.target.getAttribute('data-name');
            const price = parseFloat(e.target.getAttribute('data-price'));
            const image = e.target.parentNode.querySelector('.product-image').getAttribute('src').replace('foto/', ''); // Get image URL and remove 'foto/' prefix
            addItemToCart(name, price, image);
        }
    });

    // Load cart items when DOM content is loaded
    loadCartItems();

    // Handle checkout button click
    cartItemsList.addEventListener('click', (e) => {
        if (e.target.classList.contains('buy-btn')) {
            handlePurchase();
        }
    });

    function handlePurchase() {
        // Redirect to payment form or receipt page
        window.location.href = 'payment-form.html'; // Ganti dengan halaman form pembayaran Anda
    }
});
