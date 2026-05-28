let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function mostrarCarrito() {
    const contenedor = document.getElementById('lista-carrito');
    const totalSpan = document.getElementById('total-carrito');
    contenedor.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p style="text-align:center;">El carrito está vacío.</p>';
        totalSpan.textContent = '0.00';
        return;
    }

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        const div = document.createElement('div');
        div.className = 'item-carrito';
        div.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}">
            <div>
                <strong>${item.nombre}</strong><br>
                <small>Q${item.precio} c/u</small>
            </div>
            <div>
                <button onclick="cambiarCantidad(${index}, -1)">-</button>
                <span>${item.cantidad}</span>
                <button onclick="cambiarCantidad(${index}, 1)">+</button>
            </div>
            <div>Subtotal: Q${subtotal}</div>
            <button onclick="eliminarProducto(${index})" style="background:red; color:white; border:none;">Eliminar</button>
        `;
        contenedor.appendChild(div);
    });

    totalSpan.textContent = total.toFixed(2);
}

function cambiarCantidad(index, cambio) {
    const item = carrito[index];
    const nuevaCantidad = item.cantidad + cambio;
    if (nuevaCantidad < 1) return alert('No se puede tener 0 productos');
    item.cantidad = nuevaCantidad;
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

function eliminarProducto(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

function finalizarCompra() {
    if (carrito.length === 0) return alert('El carrito está vacío.');
    if (confirm('¿Estás seguro de finalizar la compra?')) {
        localStorage.removeItem('carrito');
        alert('¡Compra realizada con éxito!');
		window.print();
        window.location.href = 'index.html'; // Redirigir al inicio
    }
}

document.addEventListener('DOMContentLoaded', mostrarCarrito);