// Selecting Elements
// const header = document.querySelector('.site-header');
// const cartBtn = document.getElementById('cart-btn');

// Creating Elements
function createProductCard(product) {
    const card = document.createElement('article');
    card.className = "col-6 col-md-4 col-lg-3 d-flex"; // Add column classes to the article itself
    card.innerHTML = `
                    <div class="card h-100 shadow-sm border-0 w-100">
                        <img src="${product.image}" class="card-img-top product-img" alt="${product.name}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text text-muted small">Lightweight and comfortable for daily use.</p>
                            <div class="mt-auto">
                                <p class="text-danger fw-bold fs-5 mb-2">$${product.price}</p>
                                <button class="btn btn-warning w-100 fw-semibold add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                            </div>
                        </div>
                    </div>
    `;
    return card;
}

const heading = document.getElementById("subheading");


const productList = [{
    id: 1,
    name: "Headphone",
    price: 49.99,
    image: "https://www.gonoise.com/cdn/shop/files/red_result_grande.webp?v=1788175425"
}, {
    id: 2,
    name: "phone",
    price: 49.99,
    image: "https://www.gonoise.com/cdn/shop/files/red_result_grande.webp?v=1788175425"
}, {
    id: 3,
    name: "ipad",
    price: 49.99,
    image: "https://www.gonoise.com/cdn/shop/files/red_result_grande.webp?v=1788175425"
}, {
    id: 4,
    name: "watch",
    price: 49.99,
    image: "https://www.gonoise.com/cdn/shop/files/red_result_grande.webp?v=1788175425"
}, {
    id: 5,
    name: "Headphone",
    price: 49.99,
    image: "https://www.gonoise.com/cdn/shop/files/red_result_grande.webp?v=1788175425"
}, {
    id: 6,
    name: "Headphone",
    price: 49.99,
    image: "https://www.gonoise.com/cdn/shop/files/red_result_grande.webp?v=1788175425"
}, {
    id: 7,
    name: "Headphone",
    price: 49.99,
    image: "https://www.gonoise.com/cdn/shop/files/red_result_grande.webp?v=1788175425"
}, {
    id: 8,
    name: "Headphone",
    price: 49.99,
    image: "https://www.gonoise.com/cdn/shop/files/red_result_grande.webp?v=1788175425"
}];





const grid = document.querySelector('.product-grid');

function renderProducts(productList) {
    if (grid) { 
        grid.innerHTML='';// Clear existing
        productList.forEach(product => {
            grid.appendChild(createProductCard(product));
        });
    }
}

renderProducts(productList);

// ---------------------------------------------------------
// 1. FORM EVENTS: Handling the Search Submit & Input
// ---------------------------------------------------------
const searchForm = document.querySelector('form[role="search"]');
if (searchForm) {
    const searchInput = searchForm.querySelector('input[type="search"]');

    // Prevent page reload on submit
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log("Search submitted for:", searchInput.value);
    });

    // Real-time search filter (Input Event)
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        
        // Filter the productList array based on the name
        const filteredProducts = productList.filter(product => 
            product.name.toLowerCase().includes(query)
        );
        
        // Re-render the grid with only the filtered products!
        renderProducts(filteredProducts);
    });
}

// ---------------------------------------------------------
// 2. EVENT DELEGATION: Add to Cart functionality
// ---------------------------------------------------------
if (grid) {
    grid.addEventListener('click', (e) => {
        // Check if the exact element clicked has the 'add-to-cart-btn' class
        if (e.target.classList.contains('add-to-cart-btn')) {
            
            // Get the ID we stored in the data-id attribute
            const productId = e.target.getAttribute('data-id');
            
            // Find the actual product in our array
            const product = productList.find(p => p.id == productId);
            
            if (product) {
                alert(`Added ${product.name} to cart!`);
                // You can update a cart array or the cart badge count here
                const cartBadge = document.querySelector('#cart-btn .badge');
                if (cartBadge) {
                    cartBadge.textContent = parseInt(cartBadge.textContent) + 1;
                }
            }
        }
    });
}

// ---------------------------------------------------------
// 3. KEYBOARD EVENTS: Escape Key Detection
// ---------------------------------------------------------
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        console.log("Escape key pressed! If you have custom modals, you would close them here.");
    }
});
