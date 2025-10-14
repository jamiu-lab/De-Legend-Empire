const cartToggle = document.getElementById("cartToggle");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");
const cartBody = document.getElementById("cartBody");
// const addToCartBtn = document.querySelector(".add-to-cart");
const overlay = document.getElementById("overlay");

// Open cart
cartToggle.addEventListener("click", () => {
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

// Add item to cart
addToCartBtn.addEventListener("click", () => {
  cartBody.innerHTML = ""; // clear empty message

  const item = document.createElement("div");
  item.classList.add("cart-item");
  item.innerHTML = `
    <img src="https://via.placeholder.com/50" alt="Product">
    <div>
      <p>Product Name</p>
      <p>$20</p>
    </div>
  `;

  cartBody.appendChild(item);
});
