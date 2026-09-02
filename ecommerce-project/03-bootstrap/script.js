function calculateTotal(price, quantity) {
    return price * quantity;
}

function formatPrice(amount) {
    return `$${amount.toFixed(2)}`;
}

const productName = "Wireless Headphones";
const price = 49.99;
const inStock = true;

// let — can be reassigned (use when value changes)
let quantity = 1;
let cartTotal = 0;
