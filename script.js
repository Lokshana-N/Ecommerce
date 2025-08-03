let cart = [];

function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    alert("This item is already in the cart!");
    return;
  }

  cart.push({ name, price });
  updateCartCount();
  saveCart();
  alert("${name} added to cart!");
}

function updateCartCount() {
  document.getElementById('cart-count').innerText = cart.length;
}

function searchProducts() {
  let query = document.getElementById("search").value.toLowerCase();
  let products = document.querySelectorAll(".product");

  products.forEach(product => {
    let name = product.textContent.toLowerCase();
    if (name.includes(query)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

function viewCart() {
  const cartModal = document.getElementById('cart-modal');
  const cartItems = document.getElementById('cart-items');
  const total = document.getElementById('total-price');

  cartItems.innerHTML = '';
  let totalPrice = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} - ₹${item.price.toLocaleString('en-IN')}
      <button onclick="removeFromCart(${index})" style="float:right; background:red; color:white; border:none; padding:4px 8px; border-radius:4px;">❌</button>
    `;
    cartItems.appendChild(li);
    totalPrice += item.price;
  });

  total.innerText = totalPrice.toLocaleString('en-IN');
  cartModal.style.display = 'flex';
}

function closeCart() {
  document.getElementById('cart-modal').style.display = 'none';
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
  const stored = localStorage.getItem('cart');
  if (stored) {
    cart = JSON.parse(stored);
    updateCartCount();
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartCount();
  viewCart();
}

loadCart();