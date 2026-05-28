// Vector de 10 Pants
const productos = [
  { codigo: "PN001", nombre: "Pants Nike Sport", marca: "Nike", descripcion: "Jogger cómodo", talla: "M", color: "gris", precio: 350, imagen: "nsport.jpg" },
  { codigo: "PN002", nombre: "Pants Adidas Training", marca: "Adidas", descripcion: "Corte ajustado", talla: "L", color: "Negro", precio: 380, imagen: "adidatr.jpg" },
  { codigo: "PN003", nombre: "Pants Puma Relax", marca: "Puma", descripcion: "Tela muy suave", talla: "S", color: "Negro", precio: 340, imagen: "pr.jpg" },
  { codigo: "PN004", nombre: "Pants Reebok Gym", marca: "Reebok", descripcion: "Bolsillos laterales", talla: "M", color: "gtis", precio: 400, imagen: "rg.jpg"},
  { codigo: "PN005", nombre: "Pants Under Armour", marca: "Under Armour", descripcion: "Térmico", talla: "XL", color: "gris", precio: 420, imagen: "ha.jpg" },
  { codigo: "PN006", nombre: "Pants New Balance", marca: "New Balance", descripcion: "Estilo urbano", talla: "M", color: "Negro", precio: 370, imagen: "nB.jpg" },
  { codigo: "PN007", nombre: "Pants Nike Fleece", marca: "Nike", descripcion: "Franela para frío", talla: "L", color: "Azul", precio: 390, imagen: "Nf.jpg" },
  { codigo: "PN008", nombre: "Pants Adidas Essentials", marca: "Adidas", descripcion: "Básico para casa", talla: "S", color: "Negro", precio: 330, imagen: "ades.jpg" },
  { codigo: "PN009", nombre: "Pants Puma Tech", marca: "Puma", descripcion: "Tecnología dry", talla: "M", color: "Gris", precio: 360, imagen: "pt.jpg" },
  { codigo: "PN010", nombre: "Pants Champion Basic", marca: "Champion", descripcion: "100% algodón", talla: "L", color: "Negro", precio: 310, imagen: "cb.jpg" }
];

const contenedor = document.getElementById('contenedor-productos');
const modal = document.getElementById('modal');
const btnCerrar = document.getElementById('btn-cerrar-modal');
const btnComprar = document.getElementById('btn-comprar-modal');
let productoActual = null;

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


function abrirModal(index) {
  productoActual = productos[index];
  document.getElementById('modal-imagen').src = productoActual.imagen;
  document.getElementById('modal-nombre').textContent = productoActual.nombre;
  document.getElementById('modal-precio').textContent = productoActual.precio;
  document.getElementById('modal-marca').textContent = productoActual.marca;
  document.getElementById('modal-codigo').textContent = productoActual.codigo;
  document.getElementById('modal-descripcion').textContent = productoActual.descripcion;
  document.getElementById('modal-talla').textContent = productoActual.talla;
  document.getElementById('modal-color').textContent = productoActual.color;
  document.getElementById('modal-cantidad').value = 1;
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

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