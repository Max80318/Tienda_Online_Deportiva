const productos = [
  { codigo: "PT001",
    nombre: "Pantaloneta Nike", 
	marca: "Nike", descripcion: "Corta y transpirable", 
	talla: "M", 
	color: "Negro", 
	precio: 180, 
	imagen: "pantaloneta.jpg" },
	
  { codigo: "PT002", 
	nombre: "Pantaloneta Adidas", 
	marca: "Adidas", 
	descripcion: "Con bolsillos", 
	talla: "L", 
	color: "Negro", 
	precio: 200, 
	imagen: "adidaspant.jpg" },
	
  { codigo: "PT003", 
	nombre: "Pantaloneta Puma", 
	marca: "Puma", 
	descripcion: "Ligera para running", 
	talla: "S", 
	color: "Negro", 
	precio: 170, 
	imagen: "pumapantaloneta.jpg" },
	
  { codigo: "PT004", 
	nombre: "Pantaloneta Reebok", 
	marca: "Reebok", 
	descripcion: "Elasticidad total", 
	talla: "M", 
	color: "gris", 
	precio: 220, 
	imagen: "r.jpg" },
	
  { codigo: "PT005", 
	nombre: "Pantaloneta Under Armour", 
	marca: "Under Armour", 
	descripcion: "Compresión", 
	talla: "XL", 
	color: "azul", 
	precio: 240, 
	imagen: "ha.jpg" },
  { codigo: "PT006", 
	nombre: "Pantaloneta New Balance", 
	marca: "New Balance", 
	descripcion: "Corte moderno", 
	talla: "M", 
	color: "Negro", 
	precio: 190, 
	imagen: "newb.jpg" },
  { codigo: "PT007", 
	nombre: "Pantaloneta Nike Dri-Fit", 
	marca: "Nike", 
	descripcion: "Anti humedad", 
	talla: "L", 
	color: "Negro", 
	precio: 210, 
	imagen: "nik.jpg" },
  { codigo: "PT008", 
	nombre: "Pantaloneta Adidas 3S", 
	marca: "Adidas", 
	descripcion: "Clásica 3 rayas", 
	talla: "S", 
	color: "Negro", 
	precio: 230, 
	imagen: "3s.jpg" },
  { codigo: "PT009", 
	nombre: "Pantaloneta Puma Basic", 
	marca: "Puma", 
	descripcion: "Básica diaria", 
	talla: "M", 
	color: "azul", 
	precio: 150, 
	imagen: "puma.jpg" },
  { codigo: "PT010", 
	nombre: "Pantaloneta Champion", 
	marca: "Champion", 
	descripcion: "Algodón suave", 
	talla: "L", 
	color: "Negro", 
	precio: 260, 
	imagen: "champion.jpg" }
];

const contenedor = document.getElementById('contenedor-productos');
const modal = document.getElementById('modal');
const btnCerrar = document.getElementById('btn-cerrar-modal');
const btnComprar = document.getElementById('btn-comprar-modal');
let productoActual = null;

// Crear tarjetas
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

// ABRIR MODAL
function abrirModal(index) {
  productoActual = productos[index];
  document.getElementById('modal-imagen').src = productoActual.imagen;
  document.getElementById('modal-nombre').textContent = productoActual.nombre;
  document.getElementById('modal-marca').textContent = productoActual.marca;
  document.getElementById('modal-precio').textContent = productoActual.precio;
  document.getElementById('modal-codigo').textContent = productoActual.codigo;
  document.getElementById('modal-descripcion').textContent = productoActual.descripcion;
  document.getElementById('modal-talla').textContent = productoActual.talla;
  document.getElementById('modal-color').textContent = productoActual.color;
  document.getElementById('modal-cantidad').value = 1;
  
  // Abrir modal
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

// CERRAR MODAL - Usar classList, no style.display
btnCerrar.addEventListener('click', () => {
  modal.classList.remove('show');
  document.body.style.overflow = 'auto';
});

// CERRAR AL CLICKEAR FUERA
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
  }
});

// COMPRAR
btnComprar.addEventListener('click', function() {
  const cantidad = parseInt(document.getElementById('modal-cantidad').value);
  if (cantidad < 1) {
    alert('Selecciona al menos 1');
    return;
  }
  
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const existente = carrito.find(item => item.codigo === productoActual.codigo);
  
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ ...productoActual, cantidad: cantidad });
  }
  
  localStorage.setItem('carrito', JSON.stringify(carrito));
  alert('✓ Agregado al carrito!');
  
  // Cerrar modal
  modal.classList.remove('show');
  document.body.style.overflow = 'auto';
});