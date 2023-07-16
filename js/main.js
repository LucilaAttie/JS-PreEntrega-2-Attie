const productos = [
    {
        id: "taza-rayada-azul",
        titulo: "Taza rayada azul",
        imagen: "./images/tazas/taza-rayada-azul.jpg",
        categoria: {
            nombre: "Tazas",
            id: "tazas"
        },
        precio: 1000
    },

    {
        id: "taza-lunares",
        titulo: "Taza Lunares",
        imagen: "./images/tazas/taza-lunares.jpg",
        categoria: {
            nombre: "Tazas",
            id: "tazas"
        },
        precio: 1000
    },

    {
        id: "taza-rayas-marron",
        titulo: "Taza rayas marron",
        imagen: "./images/tazas/taza-rayada-marron.jpg",
        categoria: {
            nombre: "Tazas",
            id: "tazas"
        },
        precio: 1000
    },

    {
        id: "taza-negra",
        titulo: "Taza Negra",
        imagen: "./images/tazas/taza-negra.jpeg",
        categoria: {
            nombre: "Tazas",
            id: "tazas"
        },
        precio: 1000
    },

    {
        id: "bowl-liso",
        titulo: "Bowl Liso",
        imagen: "./images/bowls/bowl-liso.jpeg",
        categoria: {
            nombre: "Bowls",
            id: "bowls"
        },
        precio: 1000
    },

    {
        id: "bowl-lunares",
        titulo: "Bowl Lunares",
        imagen: "./images/bowls/bowl-lunares.jpg",
        categoria: {
            nombre: "Bowls",
            id: "bowls"
        },
        precio: 1000
    },

    {
        id: "bowl-rayado",
        titulo: "Bowl Rayado",
        imagen: "./images/bowls/bowl-rayado.jpg",
        categoria: {
            nombre: "Bowls",
            id: "bowls"
        },
        precio: 1000
    },

    {
        id: "florero-rayado",
        titulo: "Florero Rayado",
        imagen: "./images/floreros/florero-rayado.jpeg",
        categoria: {
            nombre: "Floreros",
            id: "floreros"
        },
        precio: 1000
    },

    {
        id: "florero-curvas",
        titulo: "Florero Curvas",
        imagen: "./images/floreros/florero-curvas.jpg",
        categoria: {
            nombre: "Floreros",
            id: "floreros"
        },
        precio: 1000
    },

    {
        id: "florero-lunares",
        titulo: "Florero Lunares",
        imagen: "./images/floreros/florero-lunares.jpg",
        categoria: {
            nombre: "Floreros",
            id: "floreros"
        },
        precio: 1000
    },

    {
        id: "plato-cuadrados",
        titulo: "Plato Cuadrados",
        imagen: "./images/platos/plato-cuadrados.jpg",
        categoria: {
            nombre: "Platos",
            id: "platos"
        },
        precio: 1000
    },
    {
        id: "plato-marble",
        titulo: "Plato Marble",
        imagen: "./images/platos/plato-marble.jpg",
        categoria: {
            nombre: "Platos",
            id: "platos"
        },
        precio: 1000
    }

];

const contendorProductos = document.querySelector ("#contenedor-productos");
const botonesCategorias = document.querySelectorAll (".boton-categoria");
let botonesAgregar = document.querySelectorAll (".producto-agregar");
const numeroCarrito = document.querySelector ("#numero-carrito");

function cargarProductos(prodcutosSeleccionados) {

    contendorProductos.innerHTML = "";

    prodcutosSeleccionados.forEach(producto => {

        const div = document.createElement ("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">  
                <div class="producto-detalles-info"> 
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                     <p class="producto-precio">$ ${producto.precio}</p> 
                </div>
                    
             <button class="producto-agregar" id= "${producto.id}"><i class="bi bi-cart-plus pr-2"></i> Agregar al carrito</button>
            
        `;

        contendorProductos.append(div);
    }) 

    actualizarBotonesAgregar ();
}

cargarProductos(productos);


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("seleccionado"));
        e.target.classList.add("seleccionado");

        if (e.target.id != "todos") {
            const categoriaSeleccionada = productos.filter(producto => producto.categoria.id === e.target.id);
            cargarProductos(categoriaSeleccionada);
        } else {
            cargarProductos(productos);

        }
        

    })
});


function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll (".producto-agregar");

    botonesAgregar.forEach (boton => { 
        boton.addEventListener ("click", agregarAlCarrito)
    });

}

let productosEnCarrito;

let productosEnCarritoLocalStorage = localStorage.getItem("productos-en-carrito");


if (productosEnCarritoLocalStorage) {

    productosEnCarrito = JSON.parse(productosEnCarritoLocalStorage);
    actualizarNumeroCarrito();
} else {
    productosEnCarrito = [];
}


function agregarAlCarrito(e) {
    const idBoton = e.target.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {

       const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
       productosEnCarrito[index].cantidad++;

    } else {
        productoAgregado.cantidad =1;
        productosEnCarrito.push(productoAgregado);
    }  

    actualizarNumeroCarrito ();


    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));
}

function actualizarNumeroCarrito() { 
    let nuevoNumeroCarrito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numeroCarrito.innerText = nuevoNumeroCarrito;
}