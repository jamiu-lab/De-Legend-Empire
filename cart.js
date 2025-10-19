const cartToggle = document.getElementById("cartToggle");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");
const cartBody = document.getElementById("cartBody");
const overlay = document.getElementById("overlay");

// Open cart
cartToggle.addEventListener("click", () => {
  renderCart();
  cartDrawer.classList.add("active");
  overlay.classList.add("active");
});

// Close cart
closeCart.addEventListener("click", closeCartDrawer);
overlay.addEventListener("click", closeCartDrawer);

function closeCartDrawer() {
  cartDrawer.classList.remove("active");
  overlay.classList.remove("active");
}

function renderCart() {
  cartBody.innerHTML = '<div id="closeCart" class="cancel">X</div>'; // Keep the close button

  if (cart.length === 0) {
    cartBody.innerHTML += `
      <div>
        <div class="empty-text">Your cart is empty</div>
        <a href="index.html">
          <button class="continue-btn">Continue Shopping</button>
        </a>
      </div>
    `;
  } else {
    cart.forEach((item, index) => {
      const product = products.find((p) => p.id === item.id);
      if (product) {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
          <img src="${product.image}" alt="${product.alt}">
          <div class="cart-item-details">
            <p class="cart-item-name">${product.name}</p>
            <div class="quantity-controls">
              <button class="qty-btn minus-btn" data-index="${index}" aria-label="Decrease quantity of ${product.name}">-</button>
              <span class="cart-item-quantity">Qty: ${item.quantity}</span>
              <button class="qty-btn plus-btn" data-index="${index}" aria-label="Increase quantity of ${product.name}">+</button>
            </div>
          </div>
          <button class="delete-btn" data-index="${index}" aria-label="Remove ${product.name} from cart">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
          </button>
        `;
        cartBody.appendChild(cartItem);
      }
    });
  }

  // Re-attach close event to the new close button
  const newCloseCart = document.getElementById("closeCart");
  if (newCloseCart) {
    newCloseCart.addEventListener("click", closeCartDrawer);
  }

  // Attach delete event listeners
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = parseInt(e.currentTarget.getAttribute("data-index"));
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartBadge();
      renderCart();
    });
  });

  // Attach quantity control event listeners
  document.querySelectorAll(".plus-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = parseInt(e.currentTarget.getAttribute("data-index"));
      cart[index].quantity += 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartBadge();
      renderCart();
    });
  });

  document.querySelectorAll(".minus-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = parseInt(e.currentTarget.getAttribute("data-index"));
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartBadge();
        renderCart();
      }
    });
  });
}
