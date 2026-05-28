const productos = [
    { codigo: "P001", nombre: "Playera Nike Sport", marca: "Nike", descripcion: "Playera deportiva transpirable", talla: "M", color: "Negro", precio: 250, imagen: "pns.jpg" },
    { codigo: "P002", nombre: "Playera Adidas Training", marca: "Adidas", descripcion: "Ideal para running", talla: "L", color: "Azul", precio: 280, imagen: "adt.jpg" },
    { codigo: "P003", nombre: "Playera Puma Fitness", marca: "Puma", descripcion: "Tela ligera y fresca", talla: "S", color: "blanco", precio: 220, imagen: "PF.jpg" },
    { codigo: "P004", nombre: "Playera Reebok Classic", marca: "Reebok", descripcion: "Estilo retro", talla: "M", color: "amarillo", precio: 300, imagen: "rc.jpg" },
    { codigo: "P005", nombre: "Playera Under Armour", marca: "Under Armour", descripcion: "Secado rápido", talla: "XL", color: "negeo", precio: 270, imagen: "playeraHA.jpg" },
    { codigo: "P006", nombre: "Playera New Balance", marca: "New Balance", descripcion: "Comodidad total", talla: "M", color: "amarillo", precio: 260, imagen: "nr.jpg" },
    { codigo: "P007", nombre: "Playera Nike Running", marca: "Nike", descripcion: "Material reflectivo", talla: "L", color: "blanco", precio: 290, imagen: "pns.jpg" },
    { codigo: "P008", nombre: "Playera Adidas Originals", marca: "Adidas", descripcion: "Diseño urbano", talla: "S", color: "Verde", precio: 320, imagen: "ad.jpg" },
    { codigo: "P009", nombre: "Playera Puma Basic", marca: "Puma", descripcion: "Básica para gym", talla: "M", color: "negro", precio: 200, imagen: "pbasi.jpg" },
    { codigo: "P010", nombre: "Playera Champion", marca: "Champion", descripcion: "Algodón premium", talla: "L", color: "negro", precio: 350, imagen: "cham.jpg" }
];

const contenedor = document.getElementById('contenedor-productos');
const modal = document.getElementById('modal');
let productoActual = null;

// Mostrar productos
productos.forEach((prod, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="${prod.imagen}" alt="${prod.nombre}">
        <h3>${prod.nombre}</h3>
        <p>${prod.marca}</p>
        <button onclick="abrirModal(${index})">Ver</button>
    `;
    contenedor.appendChild(card);
});

// Función para abrir modal
function abrirModal(index) {
    productoActual = productos[index];
    document.getElementById('modal-imagen').src = productoActual.imagen;
    document.getElementById('modal-nombre').textContent = productoActual.nombre;
    document.getElementById('modal-codigo').textContent = productoActual.codigo;
    document.getElementById('modal-marca').textContent = productoActual.marca;
    document.getElementById('modal-descripcion').textContent = productoActual.descripcion;
    document.getElementById('modal-talla').textContent = productoActual.talla;
    document.getElementById('modal-color').textContent = productoActual.color;
    document.getElementById('modal-precio').textContent = productoActual.precio;
    document.getElementById('modal-cantidad').value = 1;
    modal.style.display = 'flex';
}

// Función para cerrar modal
document.getElementById('btn-cerrar-modal').onclick = () => modal.style.display = 'none';

// Función Comprar (Con Cantidad)
document.getElementById('btn-comprar-modal').onclick = function() {
    const cantidad = parseInt(document.getElementById('modal-cantidad').value);
    if (cantidad < 1) return alert('Selecciona al menos 1 producto');

    // Obtener carrito actual de localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Verificar si el producto ya existe
    const existente = carrito.find(item => item.codigo === productoActual.codigo);
    if (existente) {
        existente.cantidad += cantidad;
    } else {
        carrito.push({ ...productoActual, cantidad: cantidad });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert('Producto agregado al carrito!');
    modal.style.display = 'none';
};