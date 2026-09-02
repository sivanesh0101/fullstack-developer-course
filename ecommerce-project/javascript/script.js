function calculateTotal(price, quantity) {
    return price * quantity;
}

function formatPrice(amount) {
    return `$${amount.toFixed(2)}`;
}

console.log(formatPrice(calculateTotal(49.99, 3))); // "$149.97"
