
  function addToCart(productName, productPrice) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      const existingItem = cart.find(item => item.name === productName);
      if (existingItem) {
          existingItem.quantity += 1;
      } else {
          cart.push({ name: productName, price: productPrice, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));

      // Auto buka sidebar setelah tambah
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

  function renderCartItems() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const cartItemsContainer = document.getElementById("cartItems");
      cartItemsContainer.innerHTML = '';

      if (cart.length === 0) {
          cartItemsContainer.innerHTML = "<li>Keranjang kosong.</li>";
          return;
      }

      cart.forEach(item => {
          const li = document.createElement("li");
          li.innerHTML = `
              <strong>${item.name}</strong><br>
              Jumlah: ${item.quantity}<br>
              Total: Rp ${(item.price * item.quantity).toLocaleString()}
          `;
          cartItemsContainer.appendChild(li);
      });
  }

  // Tampilkan isi cart saat load halaman
  window.onload = renderCartItems;

