const productos = [
  { codigo: "Z001", nombre: "Zapatos Nike Air", marca: "Nike", descripcion: "Amortiguación total", talla: "42", color: "blanco", precio: 600, imagen: "na.jpg" },
  { codigo: "Z002", nombre: "Zapatos Adidas Ultra", marca: "Adidas", descripcion: "Ligeros y rápidos", talla: "40", color: "negro", precio: 650, imagen: "adultr.jpg" },
  { codigo: "Z003", nombre: "Zapatos Puma Speed", marca: "Puma", descripcion: "Para sprints", talla: "43", color: "Negro", precio: 550, imagen: "psp.jpg" },
  { codigo: "Z004", nombre: "Zapatos Reebok Cross", marca: "Reebok", descripcion: "Crossfit", talla: "41", color: "Negro", precio: 700, imagen: "rc.jpg" },
  { codigo: "Z005", nombre: "Zapatos Under Armour", marca: "Under Armour", descripcion: "Resistentes", talla: "42", color: "Gris", precio: 680, imagen: "zunder armour.jpg" },
  { codigo: "Z006", nombre: "Zapatos New Balance", marca: "New Balance", descripcion: "Comodidad diaria", talla: "44", color: "Negro", precio: 620, imagen: "Nw.jpg" },
  { codigo: "Z007", nombre: "Zapatos Nike Run", marca: "Nike", descripcion: "Respirables", talla: "40", color: "Negro", precio: 590, imagen: "nikerun.jpg" },
  { codigo: "Z008", nombre: "Zapatos Adidas Sport", marca: "Adidas", descripcion: "Agarre perfecto", talla: "43", color: "Blanco", precio: 640, imagen: "adidasport.jpg" },
  { codigo: "Z009", nombre: "Zapatos Puma Basic", marca: "Puma", descripcion: "Básico para gym", talla: "41", color: "rosado", precio: 500, imagen: "puma basic.jpg" },
  { codigo: "Z010", nombre: "Zapatos Champion", marca: "Champion", descripcion: "Estilo clásico", talla: "42", color: "Blanco", precio: 450, imagen: "chamz.jpg" }
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

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
  }
});

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
 
  modal.classList.remove('show');
  document.body.style.overflow = 'auto';
});