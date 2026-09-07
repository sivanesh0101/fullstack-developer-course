// Selecting Elements
const header = document.querySelector('.site-header');
const cartBtn = document.getElementById('cart-btn');

// Creating Elements
function createProductCard(product) {
    const card = document.createElement('article');
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <button class="btn-add-cart" data-id="${product.id}">Add to Cart</button>
    `;
    return card;
}

// Rendering a Product List
const products = [
    { id: 1, name: "Wireless Headphones", price: 49.99, image: "headphones.jpg" },
    { id: 2, name: "Running Shoes", price: 79.99, image: "shoes.jpg" },
    { id: 3, name: "Backpack", price: 34.99, image: "backpack.jpg" },
];

const grid = document.querySelector('.product-grid');

function renderProducts(productList) {
    if (grid) {
        grid.innerHTML = ''; // Clear existing
        productList.forEach(product => {
            grid.appendChild(createProductCard(product));
        });
    }
}

renderProducts(products);

// Modifying Elements
if (cartBtn) {
    // Change text
    cartBtn.textContent = 'Cart (3)';
}

if (grid && grid.firstElementChild) {
    const card = grid.firstElementChild;
    // Change styles
    card.style.border = '2px solid #e77600';

    // Toggle classes
    card.classList.add('selected');
    card.classList.remove('selected');
    card.classList.toggle('selected');

    // Set attributes
    card.setAttribute('data-id', '123');
}
