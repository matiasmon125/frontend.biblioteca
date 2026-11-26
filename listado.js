//filtro de libros//
const categorias = document.getElementById("categorias");

categorias.addEventListener("change", function() {

    const categoria = categorias.value;
    const libros = document.querySelectorAll(".libro");

    libros.forEach(function(libro) {

        if (categoria === "Todos" || 
            libro.dataset.categoria === categoria) {

            libro.style.display = "inline-block";

        } else {

            libro.style.display = "none";

        }

    });

});

//carrito y reservas//
let carrito = [];
let total = 0;

// RESERVAR LIBROS
function reservarLibro(boton) {
    let libro = boton.parentElement;
    let estado = libro.querySelector(".precio");

    if (estado.textContent === "disponible") {
        alert("este libro ya está disponible para su compra.");
        return;
    }

    if (estado.textContent === "Reservado") {
        alert("Este libro ya está reservado.");
        return;
    }

    estado.textContent = "Reservado";
    boton.textContent = "reservado";
    boton.disabled = true;

    alert("¡Libro reservado con éxito!");
}

// AGREGAR AL CARRITO
function agregarCarrito(boton) {
    let libro = boton.parentElement;
    let nombre = libro.querySelector("h3").textContent;
    let precio = Number(
        libro.querySelectorAll("p")[
            libro.querySelectorAll("p").length - 1
        ].textContent.replace("$", "")
    );

    if (!precio || isNaN(precio)) {
        alert("No se pudo obtener el precio.");
        return;
    }

    carrito.push({nombre, precio});
    total += precio;

    actualizarCarrito();
}

// ACTUALIZAR CARRITO
function actualizarCarrito() {
    let lista = document.getElementById("lista-carrito");
    lista.innerHTML = "";

    carrito.forEach((libro, indice) => {
        let item = document.createElement("li");
        item.textContent = libro.nombre + " - $" + libro.precio;

        let eliminar = document.createElement("button");
        eliminar.textContent = "Eliminar";
        eliminar.onclick = () => {
            total -= carrito[indice].precio;
            carrito.splice(indice, 1);
            actualizarCarrito();
        };

        item.appendChild(eliminar);
        lista.appendChild(item);
    });

    document.getElementById("total").textContent = total;
}

// VACIAR CARRITO
function vaciarCarrito() {
    carrito = [];
    total = 0;
    actualizarCarrito();
}

// REGISTRAR SOCIO
function registrarSocio() {
    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let clave = document.getElementById("clave").value;

    if (!nombre || !correo || !clave) {
        alert("Completá todos los campos.");
        return;
    }

    document.getElementById("mensaje").textContent =
        "¡Bienvenido/a " + nombre + "! Ya estás registrado/a como socio.";

    document.getElementById("nombre").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("clave").value = "";
}

