// =========================
// HERO SLIDER
// =========================

// Cache DOM elements
const heroTag = document.querySelector(".hero-tag");
const heroTitle = document.querySelector(".hero-content h1");
const heroDescription = document.querySelector(".hero-content p");
const heroButton = document.querySelector(".hero-btn");
const heroImage = document.querySelector(".hero-image img");
const prevButton = document.querySelector(".hero-prev");
const nextButton = document.querySelector(".hero-next");

// Current slide index
let currentSlide = 0;

// Display a slide
function showSlide(index) {

    if (index >= heroSlides.length) {
        index = 0;
    }

    if (index < 0) {
        index = heroSlides.length - 1;
    }

    heroTitle.parentElement.classList.add("fade-out");
    heroImage.classList.add("fade-out");

    setTimeout(() => {

        currentSlide = index;

        const slide = heroSlides[currentSlide];

        heroTag.textContent = slide.tag;
        heroTitle.textContent = slide.title;
        heroDescription.textContent = slide.description;

        heroButton.textContent = slide.button;
        heroButton.href = slide.link;

        heroImage.src = slide.image;
        heroImage.alt = slide.title;

        heroTitle.parentElement.classList.remove("fade-out");
        heroImage.classList.remove("fade-out");

    }, 400);

}

// Next slide
function nextSlide() {
    showSlide(currentSlide + 1);
}

// Previous slide
function previousSlide() {
    showSlide(currentSlide - 1);
}

// Initialize hero
showSlide(currentSlide);

// Auto-play every 5 seconds
setInterval(nextSlide, 5000);
prevButton.addEventListener("click", previousSlide);
nextButton.addEventListener("click", nextSlide);

function createProductCard(product) {
    return `
        <div class="product-card">
            <a href="product.html?product=${product.slug}">
                <img src="${product.image}" alt="${product.name}">

                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.price.amount} ${product.price.currency}</p>
                </div>
            </a>
        </div>
    `;
}

function renderFeaturedProducts() {
    const grid = document.querySelector(".products-grid");

    if (!grid) return;

    const featured = PRODUCTS.filter(product => product.featured);

    grid.innerHTML = featured
        .map(createProductCard)
        .join("");
}

renderFeaturedProducts();

function renderCollection() {

    const grid = document.getElementById("collection-grid");

    if (!grid) return;

    const params = new URLSearchParams(window.location.search);

    const category = params.get("category");

    const title = document.getElementById("collection-title");
    const subtitle = document.getElementById("collection-subtitle");

    title.textContent =
        category.charAt(0).toUpperCase() + category.slice(1) + " Collection";

    subtitle.textContent =
        "Choose your favorite design.";

    const filteredProducts = PRODUCTS.filter(product =>
        product.category === category
    );

    grid.innerHTML = "";

    filteredProducts.forEach(product => {
        grid.innerHTML += createProductCard(product);
    });

}

renderCollection();

function renderProduct() {

    const container = document.getElementById("product-container");

    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get("product");

    const product = PRODUCTS.find(item => item.slug === slug);

    if (!product) {
        container.innerHTML = "<h2>Product not found.</h2>";
        return;
    }

container.innerHTML = `
    <div class="product-layout">

        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>

        <div class="product-info">

            <h1>${product.name}</h1>

            <p class="product-price">
                ${product.price.amount} ${product.price.currency}
            </p>

            <p class="product-description">
                ${product.description}
            </p>

            <div class="product-form">

                <div class="form-group">
                    <label>Select Your Device</label>

                    <select id="device">
                        <option value="">Select your phone model</option>

                        <option>iPhone 16 Pro Max</option>
                        <option>iPhone 16 Pro</option>
                        <option>iPhone 16 Plus</option>
                        <option>iPhone 16</option>

                        <option>Samsung S25 Ultra</option>
                        <option>Samsung S25+</option>
                        <option>Samsung S25</option>

                    </select>
                </div>

                <div class="form-group">
                    <label>Your Name</label>

                    <input
                        type="text"
                        id="customer-name"
                        placeholder="Enter your name">
                </div>

                <div class="form-group">
                    <label>Phone Number</label>

                    <input
                        type="tel"
                        id="customer-phone"
                        placeholder="+971">
                </div>

                <div class="form-group">
                    <label>Delivery Address</label>

                    <textarea
                        id="customer-address"
                        placeholder="Enter your full address"></textarea>
                </div>

                <div class="order-notice">

                    <strong>Custom Made Product</strong>

                    <p>
                        Every case is custom made specifically for your selected phone model.
                        Once your order is confirmed, it cannot be cancelled or changed.
                    </p>

                </div>

                <div class="form-group checkbox-group">

                    <input type="checkbox" id="agree">

                    <label for="agree">
                        I understand and agree to the custom order policy.
                    </label>

                </div>

                <button id="order-button">
                    Place Order via WhatsApp
                </button>

            </div>

        </div>

    </div>
`;

}

renderProduct();