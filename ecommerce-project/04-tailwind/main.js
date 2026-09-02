import './style.css'

// Dark Mode Toggle
const darkToggle = document.getElementById('dark-toggle');
const html = document.documentElement;

function getTheme() {
    const saved = localStorage.getItem('tw-theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
    if (theme === 'dark') {
        html.classList.add('dark');
        darkToggle.textContent = '☀️';
    } else {
        html.classList.remove('dark');
        darkToggle.textContent = '🌙';
    }
    localStorage.setItem('tw-theme', theme);
}

// Initialize
setTheme(getTheme());

// Toggle on click
darkToggle.addEventListener('click', () => {
    const current = html.classList.contains('dark') ? 'dark' : 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
});

console.log('🛒 ShopZone Tailwind version loaded!');
