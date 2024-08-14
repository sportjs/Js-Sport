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

import {
    society1, society2, society3, society4,
    society5, society6, society7, society8,
} from '../js/imagens.js'

const fotosData = {
    'society1': society1,
    'society2': society2,
    'society3': society3,
    'society4': society4,
    'society5': society5,
    'society6': society6,
    'society7': society7,
    'society8': society8,

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