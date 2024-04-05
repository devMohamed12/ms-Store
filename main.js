// Getting elements
const responsiveIcon = document.querySelector(".responsive-icon");
const navItems = document.querySelector(".nav-items");
const cartLength = document.querySelector(".cart-length");
const productsContainer = document.querySelector(".products-container");
const modal = document.querySelector(".product-card-modal-overlay");
const cartTableTbody = document.querySelector(".cart-table-tbody");
const totalPriceCell = document.querySelector(".total-price");

// Make header responsive
responsiveIcon.addEventListener("click", () => {
  navItems.classList.toggle("responsive-nav-items");
});

// Products array
const products = [
  {
    id: 0,
    product_name: "Beats premium quality Red Headset",
    product_price: 80,
    product_image: "imgs/product1/beatsRedHeadSet.png",
    product_description:
      "Immerse yourself in crystal-clear sound with the Beats Red Headset.",
    count: 0,
    added_to_cart: false,
  },
  {
    id: 1,
    product_name: "Black Microphone and Headset Combo",
    product_price: 90,
    product_image: "imgs/product2/microPhone1.png",
    product_description:
      "Experience professional-grade audio recording and communication with the Black Microphone and Headset Combo.",
    count: 0,
    added_to_cart: false,
  },
  {
    id: 2,
    product_name: "Professional Microphone",
    product_price: 120,
    product_image: "imgs/product3/microPhone2.png",
    product_description:
      "Perfect for studio recordings and live performances, the Professional Microphone delivers exceptional sound quality.",
    count: 0,
    added_to_cart: false,
  },
  {
    id: 3,
    product_name: "Microphone with Pop Filter",
    product_price: 60,
    product_image: "imgs/product4/microPhone3.png",
    product_description:
      "Reduce unwanted noise and improve vocal clarity with the Microphone featuring a Pop Filter.",
    count: 0,
    added_to_cart: false,
  },
  {
    id: 4,
    product_name: "Red Wireless  Gaming Headset",
    product_price: 150,
    product_image: "imgs/product5/redHeadSet.png",
    product_description:
      "Dominate the gaming battlefield with the Red Gaming Headset, designed for immersive gaming experiences.",
    count: 0,
    added_to_cart: false,
  },
  {
    id: 6,
    product_name: " iPhone 15 pro max White",
    product_price: 1200,
    product_image: "imgs/trendingProducts/IPhone15WhiteTitanium.png",
    product_description:
      "Experience the future of mobile technology with the sleek and powerful White iPhone 15.",
    count: 0,
    added_to_cart: false,
  },
  {
    id: 7,
    product_name: "Black and Gold Wireless Headset",
    product_price: 100,
    product_image: "imgs/trendingProducts/blackAndGoldHeadSet.png",
    product_description:
      "Combine style and functionality with the Black and Gold Wireless Headset, delivering premium sound without the wires.",
    count: 0,
    added_to_cart: false,
  },
  {
    id: 8,
    product_name: "Black Wireless Headset",
    product_price: 120,
    product_image: "imgs/trendingProducts/black.png",
    product_description:
      "Enjoy wireless freedom and superior sound quality with the sleek Black Wireless Headset.",
    count: 0,
    added_to_cart: false,
  },
  {
    id: 9,
    product_name: "apple pro White Headphones",
    product_price: 60,
    product_image: "imgs/trendingProducts/white-headphones.png",
    product_description:
      "Elevate your music listening experience with the stylish and comfortable White Headphones.",
    count: 0,
    added_to_cart: false,
  },
];
let cart = [];

// Save cart to local storage
function saveCartToLocalStorage(cartArray) {
  localStorage.setItem("cart", JSON.stringify(cartArray));
}

// Check if cart exists in local storage
if (localStorage.cart) {
  cart = JSON.parse(localStorage.cart);
}

// Get cart length to display in the cart icon
function updateCartLength() {
  cartLength.textContent = cart.length || 0;
}

// Update cart length on page load
window.onload = updateCartLength;

// Add product to cart
function addToCart(idx) {
  const product = products[idx];
  if (product.added_to_cart) {
    product.count++;
  } else {
    product.count = 1;
    product.added_to_cart = true;
    cart.push(product);
  }
  saveCartToLocalStorage(cart);
  updateCartLength();
}

// Modal
let modalContent;

function closeModal() {
  modal.style.display = "none";
}

function viewModal(idx) {
  const product = products[idx];
  modalContent = `
    <div class="product-card-modal">
      <div class="modal-head flex-between">
        <h2 class="modal-title">${product.product_name}</h2>
        <button class="close-btn" onclick="closeModal()">X</button>
      </div>
      <div class="modal-body">
        <div class="product-img-container">
          <img src="${product.product_image}" alt="${product.product_name}" class="modal-img"/>
        </div>

        <p class="modal-description"> ${product.product_description} </p>
        <p class="modal-price"> Price is ${product.product_price} <span class="modal-price-currency">$</span></p>
      </div>
    </div>
  `;
  modal.innerHTML = modalContent;
  modal.style.display = "block";
}

// Generate product cards
if (productsContainer) {
  products.forEach((product, idx) => {
    const productCard = `
      <div class="product-card">
        <div class="img-container flex-center">
          <img src="${product.product_image}" alt="${product.product_name}" class="product-img"/>
        </div>
        <h3 class="product-name">${product.product_name}</h3>
        <p class="product-price">price is  ${product.product_price}  <span class="product-price-currency">$</span></p>
         <button class="product-btn add" onclick="addToCart(${idx})">Add to Cart</button>
        <button class="product-btn view" onclick="viewModal(${idx})">View</button>
       </div>
       
    `;

    productsContainer.innerHTML += productCard;
  });
}

// Cart functions
if (cartTableTbody) {
  function updateCartDisplay() {
    saveCartToLocalStorage(cart);
    updateCartLength();
    getTotalPrice(); // Removed cart argument as it's unnecessary
    displayCartProducts();
  }

  function getTotalPrice() {
    // Removed cart argument as it's unnecessary
    const sumTotalPrice = cart.reduce((total, cartProduct) => {
      return total + cartProduct.product_price * cartProduct.count;
    }, 0);
    totalPriceCell.innerHTML = `${sumTotalPrice} $`;
  }

  getTotalPrice(); // Call the function initially to display total price

  function increaseCartProductCount(idx) {
    cart[idx].count++;
    updateCartDisplay();
  }
  function decreaseCartProductCount(idx) {
    cart[idx].count--;
    if (cart[idx].count <= 0) {
      cart.splice(idx, 1); // Remove item from cart if count becomes 0 or less
    }
    updateCartDisplay();
  }

  function removeCartProduct(idx) {
    cart.splice(idx, 1);
    updateCartDisplay();
  }
}

function displayCartProducts() {
  if (cartTableTbody) {
    cartTableTbody.innerHTML = "";
    cart.forEach((cartProduct, idx) => {
      const productRow = `
        <tr class="cart-table-tbody-row">
          <td class="cart-product-description">
            <img src="${cartProduct.product_image}" alt="${
        cartProduct.product_name
      }" class="cart-table-tbody-row-img">
            <p class="cart-table-tbody-row-title">${
              cartProduct.product_name
            }</p>
          </td>
          <td>
            <div class="cart-count-container flex-center">
              <button class="add-to-cart-btn" onclick="increaseCartProductCount(${idx})">+</button>
              <p class="product-count">${cartProduct.count}</p>
              <button class="minus-from-cart-btn" onclick="decreaseCartProductCount(${idx})">-</button>
            </div>
          </td>
          <td>
            <button class="remove-from-cart-btn" onclick="removeCartProduct(${idx})">X</button>
          </td>
          <td class="cart-product-price-container">
            <p class="cart-product-price">
              ${
                cartProduct.count * cartProduct.product_price
              } <span class="price-currency">$</span>
            </p>
          </td>
        </tr>
      `;
      cartTableTbody.innerHTML += productRow;
    });
  }
}

// Use displayCartProducts to initially display the cart products
displayCartProducts();
