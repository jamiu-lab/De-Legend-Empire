const products = [
  { id: 1, name: "Cool T-Shirt", price: 20, image: "images/sample-tshirt.png" },
  { id: 2, name: "Custom Mug", price: 12, image: "images/sample-tshirt.png" },
  { id: 3, name: "Stylish Hoodie", price: 35, image: "images/sample-tshirt.png" }
];

const productList = document.getElementById("product-list");

products.forEach(product => {
  const item = document.createElement("div");
  item.classList.add("product");
  item.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>$${product.price}</p>
    <button onclick="addToCart(${product.id})">Add to Cart</button>
  `;
  productList.appendChild(item);
});

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(product.name + " added to cart!");
}