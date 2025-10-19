// Product data - update this array to change products
// Replace image paths with your actual image URLs
const products = [
  {
    id: 1,
    name: "Official Jogger Black",
    price: "₦15,000",
    image: "fila/IMG-20241006-WA0002.JPG", // Replace with real image path
    srcset:
      "fila/IMG-20241006-WA0002.JPG 320w, products/product1-640.jpg 640w, products/product1-1200.jpg 1200w",
    alt: "Official Jogger Black - front view",
    tag: "NEW",
  },
  {
    id: 2,
    name: "Classic Hoodie",
    price: "₦25,000",
    image: "products/product2.jpg",
    srcset:
      "products/product2-320.jpg 320w, products/product2-640.jpg 640w, products/product2-1200.jpg 1200w",
    alt: "Classic Hoodie - front view",
  },
  {
    id: 3,
    name: "Round Neck T-Shirt",
    price: "₦12,000",
    image: "products/product3.jpg",
    srcset:
      "products/product3-320.jpg 320w, products/product3-640.jpg 640w, products/product3-1200.jpg 1200w",
    alt: "Round Neck T-Shirt - front view",
    tag: "SOLD OUT",
  },
  {
    id: 4,
    name: "Casual Shorts",
    price: "₦18,000",
    image: "products/product4.jpg",
    srcset:
      "products/product4-320.jpg 320w, products/product4-640.jpg 640w, products/product4-1200.jpg 1200w",
    alt: "Casual Shorts - front view",
  },
  {
    id: 5,
    name: "Flannel Shirt",
    price: "₦22,000",
    image: "products/product5.jpg",
    srcset:
      "products/product5-320.jpg 320w, products/product5-640.jpg 640w, products/product5-1200.jpg 1200w",
    alt: "Flannel Shirt - front view",
    tag: "NEW",
  },
  {
    id: 6,
    name: "Tracksuit",
    price: "₦35,000",
    image: "products/product6.jpg",
    srcset:
      "products/product6-320.jpg 320w, products/product6-640.jpg 640w, products/product6-1200.jpg 1200w",
    alt: "Tracksuit - front view",
  },
  {
    id: 7,
    name: "Agbada Traditional",
    price: "₦50,000",
    image: "products/product7.jpg",
    srcset:
      "products/product7-320.jpg 320w, products/product7-640.jpg 640w, products/product7-1200.jpg 1200w",
    alt: "Agbada Traditional - front view",
  },
  {
    id: 8,
    name: "Fila Cap",
    price: "₦8,000",
    image: "products/product8.jpg",
    srcset:
      "products/product8-320.jpg 320w, products/product8-640.jpg 640w, products/product8-1200.jpg 1200w",
    alt: "Fila Cap - front view",
  },
];

// Cart logic
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartBadge = document.querySelector(".cart-badge");

function updateCartBadge() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartBadge) {
    if (totalQuantity > 0) {
      cartBadge.textContent = totalQuantity;
      cartBadge.style.display = "inline-block";
    } else {
      cartBadge.style.display = "none";
    }
  }
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ id: productId, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();
    // Pulse animation
    const icon = document.querySelector(".cart-icon");
    if (icon) {
      icon.classList.add("added");
      setTimeout(() => icon.classList.remove("added"), 420);
    }
  }
}

// Modal logic
const modalBackdrop = document.getElementById("modalBackdrop");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const closeModal = document.getElementById("closeModal");

function openModal(product) {
  if (modalImg && modalTitle && modalPrice && modalBackdrop) {
    modalImg.src = product.image;
    modalImg.alt = product.alt;
    modalTitle.textContent = product.name;
    modalPrice.textContent = product.price;
    modalBackdrop.classList.add("active");
    // Focus trap
    modalTitle.focus();
  }
}

function closeModalFunc() {
  if (modalBackdrop) {
    modalBackdrop.classList.remove("active");
    // Restore focus to triggering element if needed
  }
}

if (closeModal) closeModal.addEventListener("click", closeModalFunc);
if (modalBackdrop)
  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) closeModalFunc();
  });

// Keyboard accessibility
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    modalBackdrop &&
    modalBackdrop.classList.contains("active")
  ) {
    closeModalFunc();
  }
});

// Render products
const productGrid = document.querySelector(".product-grid");
if (productGrid) {
  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.setAttribute("data-sku", `P${product.id.toString().padStart(3, "0")}`);
    card.innerHTML = `
      <div class="product-image">
        <img src="${product.image}"
             srcset="${product.srcset}"
             sizes="(max-width: 480px) 48vw, (max-width: 768px) 46vw, 23vw"
             alt="${product.alt}"
             loading="lazy" decoding="async" />
        ${
          product.tag
            ? `<span class="product-tag ${
                product.tag === "SOLD OUT" ? "sold-out" : ""
              }">${product.tag}</span>`
            : ""
        }
        <div class="card-overlay">
          <div class="overlay-actions">
            <button class="btn ghost" onclick="openModal(products[${
              product.id - 1
            }])" aria-label="Quick view ${product.name}">
              Quick View
            </button>
            <button class="btn ghost" onclick="addToCart(${
              product.id
            })" aria-label="Add ${product.name} to cart">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M6 6h15l-1.5 9h-13z"/>
                <circle cx="9" cy="20" r="1.5"/>
                <circle cx="18" cy="20" r="1.5"/>
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-price">${product.price}</p>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

// Initialize cart badge
updateCartBadge();
