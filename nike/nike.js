document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".cabecalho");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", function () {
        if (window.scrollY > lastScrollY) {
            header.classList.add("com-borda");
        } else {
            header.classList.remove("com-borda");
        }
        lastScrollY = window.scrollY;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menuIcon');
    const navBar = document.getElementById('navBar');

    menuIcon.addEventListener('click', () => { 
        if (menuIcon.classList.contains('bi-list')) {
            menuIcon.classList.remove('bi-list');
            menuIcon.classList.add('bi-x');
        } else {
            menuIcon.classList.remove('bi-x');
            menuIcon.classList.add('bi-list');
        }

        const ul = navBar.querySelector('ul');
        ul.classList.toggle('show');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const carouselItems = document.querySelectorAll('.item');
    const indicators = document.querySelectorAll('.carousel-indicators button');
    let currentIndex = 0, intervalId;

    const showSlide = (index) => {
        document.querySelector('.inner').style.transform = `translateX(-${index * 100}%)`;
        indicators.forEach((btn, i) => btn.classList.toggle('active', i === index));
    };

    const showNextSlide = () => {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        showSlide(currentIndex);
    };

    intervalId = setInterval(showNextSlide, 3000);

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            clearInterval(intervalId);
            currentIndex = index;
            showSlide(currentIndex);
            intervalId = setInterval(showNextSlide, 3000);
        });
    });
});

const ameiButtons = document.querySelectorAll('.amei');
const cartIcon = document.getElementById('carrinho');
const cartOverlay = document.getElementById('cart-overlay');
const cartList = document.querySelector('.product-cart');
const cartCount = document.getElementById('cart-count');
const closeCartButton = document.getElementById('close-cart');

let cartItems = [];

function updateCartCount() {
    cartCount.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
}

function calculateTotal() {
    let total = 0;

    cartItems.forEach(item => {
        const price = parseFloat(item.price.replace('R$', '').replace(',', '.').trim());
        total += price * item.quantity;
    });

    return total.toFixed(2); 
}

function renderCartItems() {
    cartList.innerHTML = '<button id="close-cart" class="close-cart-btn">&times;</button>';

    if (cartItems.length === 0) {
        cartList.innerHTML += '<p>O carrinho está vazio.</p>';
    } else {
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="descricao">
                    <h4>${item.name}</h4>
                    <p>${item.price}</p>
                    <div class="quantity-controls">
                        <button class="decrease-quantity" data-index="${index}" ${item.quantity === 1 ? 'disabled' : ''}>-</button>                        <span class="item-quantity">${item.quantity}</span>
                        <button class="increase-quantity" data-index="${index}">+</button>
                    </div>
                    <button class="remove-item" data-index="${index}">Remover</button>
                </div>
            `;

            cartList.appendChild(cartItem);
        });

        const totalElement = document.createElement('div');
        totalElement.classList.add('cart-total');
        totalElement.innerHTML = `<h3 class="valor-total">Valor total dos produtos: R$ ${calculateTotal()}</h3>`;
        cartList.appendChild(totalElement);
    }

    const increaseButtons = document.querySelectorAll('.increase-quantity');
    const decreaseButtons = document.querySelectorAll('.decrease-quantity');
    const removeButtons = document.querySelectorAll('.remove-item');

    increaseButtons.forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });

    decreaseButtons.forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });

    removeButtons.forEach(button => {
        button.addEventListener('click', removeCartItem);
    });

    document.getElementById('close-cart').addEventListener('click', () => {
        cartOverlay.style.display = 'none';
    });
}

function addToCart(event) {
    const image = event.target.getAttribute('data-image');
    const name = event.target.getAttribute('data-name');
    const price = event.target.getAttribute('data-price');

    const existingItem = cartItems.find(item => item.name === name && item.price === price);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ image, name, price, quantity: 1 });
    }

    updateCartCount();
    renderCartItems();
}

function increaseQuantity(event) {
    const index = event.target.getAttribute('data-index');
    cartItems[index].quantity += 1;
    updateCartCount();
    renderCartItems();
}

function decreaseQuantity(event) {
    const index = event.target.getAttribute('data-index');
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity -= 1;
    } 
    if (cartItems[index].quantity === 0) {
        cartItems.splice(index, 1);
    }

    updateCartCount();
    renderCartItems();
}

function removeCartItem(event) {
    const index = event.target.getAttribute('data-index');
    cartItems.splice(index, 1);
    updateCartCount();
    renderCartItems();
}

ameiButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

cartIcon.addEventListener('click', () => {
    cartOverlay.style.display = 'flex';
});

cartOverlay.addEventListener('click', (e) => {
    if (e.target === cartOverlay) {
        cartOverlay.style.display = 'none';
    }
});

renderCartItems();
updateCartCount();

import {
    imagensNike, imagensNike1, imagensNike2, imagensNike3,
    imagensNike4, imagensNike5, imagensNike6
} from '../js/imagens.js';

const fotosData = {
    'nike': imagensNike,
    'nike1': imagensNike1,
    'nike2': imagensNike2,
    'nike3': imagensNike3,
    'nike4': imagensNike4,
    'nike5': imagensNike5,
    'nike6': imagensNike6,
};

const produtoLinks = document.querySelectorAll('.ver-fotos');
const modal = document.getElementById('foto-modal');
const closeModal = document.querySelector('.close');
const fotoGrande = document.getElementById('foto-grande');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let fotos = [];
let currentFotoIndex = 0;

function updateFoto() {
    if (fotos.length > 0) {
        fotoGrande.setAttribute('src', fotos[currentFotoIndex]);
    }
}

produtoLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const produto = link.getAttribute('data-produto');
        fotos = fotosData[produto] || [];
        currentFotoIndex = 0;
        updateFoto();
        modal.style.display = 'flex';
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

prevButton.addEventListener('click', () => {
    currentFotoIndex = (currentFotoIndex > 0) ? currentFotoIndex - 1 : fotos.length - 1;
    updateFoto();
});

nextButton.addEventListener('click', () => {
    currentFotoIndex = (currentFotoIndex < fotos.length - 1) ? currentFotoIndex + 1 : 0;
    updateFoto();
});

document.getElementById('button-pedido').addEventListener('click', function(event) {
    event.preventDefault();

    const imagem = document.getElementById('foto-grande');
    const imagemUrl = imagem.src;
    const mensagem = `Olá, estou interessado neste produto: ${imagemUrl}`;
    const mensagemCodificada = encodeURIComponent(mensagem);
    const numeroWhatsApp = '5585981975833';
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensagemCodificada}`;

    window.location.href = whatsappUrl;
});