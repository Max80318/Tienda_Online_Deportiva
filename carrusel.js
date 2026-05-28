const productosDestacados = [
    { 
        nombre: "Zapatos Rebook", 
        imagen: "Rc.jpg", 
        precio: 600 
    },
    { 
        nombre: "Pantaloneta hunder armon", 
        imagen: "ha.jpg", 
        precio: 200 
    },
    { 
        nombre: "Pants Nike", 
        imagen: "nsport.jpg", 
        precio: 450 
    },
    { 
        nombre: "Playera Champion", 
        imagen: "cham.jpg", 
        precio: 150 
    },
    { 
        nombre: "Zapatos Puma Speed", 
        imagen: "puma basic.jpg", 
        precio: 550 
    },
    { 
        nombre: "Pantaloneta Nike", 
        imagen: "nik.jpg", 
        precio: 180 
    },
];

// Variables globales
const carouselTrack = document.getElementById('carouselTrack');
let currentIndex = 0;

// ============================================================
// FUNCIÓN: Crear los items del carrusel
// ============================================================
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

// ============================================================
// FUNCIÓN: Mover el carrusel (Anterior/Siguiente)
// ============================================================
function moverCarrusel(direccion) {
    const totalItems = productosDestacados.length;
    currentIndex += direccion;
    
    // Permitir rotación infinita
    if (currentIndex >= totalItems) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = totalItems - 1;
    }
    
    actualizarCarrusel();
}

// ============================================================
// FUNCIÓN: Actualizar la posición del carrusel
// ============================================================
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

// ============================================================
// INICIALIZACIÓN: Se ejecuta cuando carga la página
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    crearCarrusel();
});

// ============================================================
// AUTO-ROTACIÓN: El carrusel se mueve automáticamente cada 5 segundos
// ============================================================
setInterval(() => {
    moverCarrusel(1);
}, 5000);
