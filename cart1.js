
function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    toggleCart();
}

function toggleCart() {
    const cartSidebar = document.getElementById("cartSidebar");
    cartSidebar.classList.toggle("open");
    renderCartItems();
}

function closeCart() {
    const cartSidebar = document.getElementById("cartSidebar");
    cartSidebar.classList.remove("open");
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
}

function renderCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById("cartItems");
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<li>Keranjang kosong.</li>";
        return;
    }

    let totalHarga = 0;

    cart.forEach((item, index) => {
        const total = item.price * item.quantity;
        totalHarga += total;

        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${item.name}</strong><br>
            Jumlah: ${item.quantity}<br>
            Total: Rp ${total.toLocaleString()}<br>
            <button onclick="removeFromCart(${index})" style="margin-top:5px;padding:4px 8px;background-color:#e74c3c;color:#fff;border:none;border-radius:4px;cursor:pointer;">Hapus</button>
        `;
        cartItemsContainer.appendChild(li);
    });

    const totalLi = document.createElement("li");
    totalLi.innerHTML = `
        <hr>
        <strong>Total Seluruh: Rp ${totalHarga.toLocaleString()}</strong>
    `;
    cartItemsContainer.appendChild(totalLi);
}

window.onload = renderCartItems;

function handleCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert("Keranjang masih kosong. Silakan tambahkan produk terlebih dahulu.");
        return; // STOP di sini, jangan lanjut redirect
    }

    // Kalau keranjang ada isinya, redirect ke halaman payment
    window.location.href = "payment.html";
}
