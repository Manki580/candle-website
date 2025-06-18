// Mobile Menu Functionality
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const closeMobileMenu = document.querySelector('.close-mobile-menu');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeMobileMenu.addEventListener('click', () => {
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

mobileMenuOverlay.addEventListener('click', (e) => {
    if (e.target === mobileMenuOverlay) {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Quick View Modal
const quickViewButtons = document.querySelectorAll('.quick-view');
const quickViewModal = document.getElementById('quickViewModal');
const closeModal = document.querySelector('.close-modal');

quickViewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const productCard = button.closest('.product-card');
        const productTitle = productCard.querySelector('h3').textContent;
        const productDescription = productCard.querySelector('.product-description').textContent;
        
        // Update modal content
        document.getElementById('modalTitle').textContent = productTitle;
        document.getElementById('modalDescription').textContent = productDescription + ' Această lumânare premium este creată cu ceară de soia 100% naturală și uleiuri esențiale pure.';
        
        // Show modal
        quickViewModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

closeModal.addEventListener('click', () => {
    quickViewModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

quickViewModal.addEventListener('click', (e) => {
    if (e.target === quickViewModal) {
        quickViewModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Quantity Selector
const quantityMinus = document.querySelector('.quantity-btn.minus');
const quantityPlus = document.querySelector('.quantity-btn.plus');
const quantityDisplay = document.querySelector('.quantity');

if (quantityMinus && quantityPlus && quantityDisplay) {
    quantityMinus.addEventListener('click', () => {
        let currentQuantity = parseInt(quantityDisplay.textContent);
        if (currentQuantity > 1) {
            quantityDisplay.textContent = currentQuantity - 1;
        }
    });

    quantityPlus.addEventListener('click', () => {
        let currentQuantity = parseInt(quantityDisplay.textContent);
        if (currentQuantity < 10) {
            quantityDisplay.textContent = currentQuantity + 1;
        }
    });
}

// Shopping Cart Functionality
let cart = [];
const cartCount = document.querySelector('.cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Add item to cart
        const productCard = button.closest('.product-card') || button.closest('.modal-info');
        const productName = productCard.querySelector('h3, h2').textContent;
        const productPrice = productCard.querySelector('.current-price').textContent;
        
        const quantity = productCard.querySelector('.quantity') ? 
            parseInt(productCard.querySelector('.quantity').textContent) : 1;
        
        // Add to cart array
        for (let i = 0; i < quantity; i++) {
            cart.push({
                name: productName,
                price: productPrice
            });
        }
        
        // Update cart count
        cartCount.textContent = cart.length;
        
        // Show success feedback
        button.textContent = 'Adăugat în Coș!';
        button.style.background = '#00b894';
        
        setTimeout(() => {
            button.textContent = 'Adaugă în Coș';
            button.style.background = '#8B4513';
        }, 2000);
        
        // Close modal if open
        if (quickViewModal.classList.contains('active')) {
            quickViewModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Newsletter Subscription
const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    if (email) {
        // Show success message
        const button = newsletterForm.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Mulțumim!';
        button.style.background = '#00b894';
        
        // Reset form
        emailInput.value = '';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '#8B4513';
        }, 3000);
    }
});

// Smooth Scrolling for Navigation Links
const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu if open
        if (mobileMenuOverlay.classList.contains('active')) {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Header Scroll Effect
const header = document.querySelector('.header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop;
});

// Search Functionality
const searchBox = document.querySelector('.search-box input');
const searchButton = document.querySelector('.search-box button');

if (searchBox && searchButton) {
    searchButton.addEventListener('click', () => {
        const searchTerm = searchBox.value.toLowerCase();
        if (searchTerm) {
            // Simple search - scroll to products section
            const productsSection = document.querySelector('#products');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    searchBox.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll('.product-card, .category-card, .testimonial, .about-feature');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Loading State for Add to Cart
function showLoading(button) {
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Se adaugă...';
}

function hideLoading(button, originalText) {
    button.disabled = false;
    button.innerHTML = originalText;
}

// Local Storage for Cart Persistence
function saveCartToStorage() {
    localStorage.setItem('candleCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('candleCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        cartCount.textContent = cart.length;
    }
}

// Initialize cart from storage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromStorage();
});

// Save cart whenever it changes
const originalPush = Array.prototype.push;
cart.push = function(...items) {
    const result = originalPush.apply(this, items);
    saveCartToStorage();
    return result;
};

// Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// Performance Monitoring
window.addEventListener('load', () => {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    }
});