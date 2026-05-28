const productosDestacados = [
    { 
        nombre: "playera adidas", 
        imagen: "ad.jpg", 
        precio: 250 
    },
    { 
        nombre: "playera adidas training", 
        imagen: "adt.jpg", 
        precio: 280 
    },
    { 
        nombre: "playera rebook clasic", 
        imagen: "rbc.jpg", 
        precio: 300 
    },
	{ 
        nombre: "playera champion", 
        imagen: "cham.jpg", 
        precio: 280 
    },
    { 
        nombre: "puma clasic", 
        imagen: "pbasi.jpg", 
        precio: 300 
    }
];

// Variables globales
const carouselTrack = document.getElementById('carouselTrack');
let currentIndex = 0;

function crearCarrusel() {
    carouselTrack.innerHTML = '';
    
    productosDestacados.forEach((producto, index) => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div style="padding: 15px; background: white;">
                <h4 style="margin: 10px 0 5px; font-size: 14px; font-weight: 600;">${producto.nombre}</h4>
                <p style="color: #27ae60; font-weight: 700;">Q${producto.precio}</p>
            </div>
        `;
        carouselTrack.appendChild(item);
    });
    
    actualizarCarrusel();
}

function moverCarrusel(direccion) {
    const totalItems = productosDestacados.length;
    currentIndex += direccion;
    
    if (currentIndex >= totalItems) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = totalItems - 1;
    }
    
    actualizarCarrusel();
}

function actualizarCarrusel() {
    const items = document.querySelectorAll('.carousel-item');
    
    items.forEach((item, index) => {
        item.classList.remove('center-item');
        if (index === currentIndex) {
            item.classList.add('center-item');
        }
    });

    // Calcular posición (desplazamiento)
    const itemWidth = 100 / productosDestacados.length;
    const translate = -currentIndex * itemWidth;
    carouselTrack.style.transform = `translateX(${translate}%)`;
}

document.addEventListener('DOMContentLoaded', function() {
    crearCarrusel();
});

setInterval(() => {
    moverCarrusel(1);
}, 5000);
