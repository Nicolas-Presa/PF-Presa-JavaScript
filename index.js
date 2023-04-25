class Producto{
    constructor(id, nombre, ingredientes, precio, imagen){
        this.id = id;
        this.imagen = imagen
        this.nombre = nombre;
        this.ingredientes = ingredientes;
        this.precio = precio;
    }
}

const hamburguesaSimple = new Producto ("hamburguesa01", "Hamburguesa Simple", "Medallon de carne 90gr y Queso Cheddar", 1500, "./Image/Hamburguesa-Simple.jpg");
const hamburguesaGrande = new Producto ("hamburguesa02","Hamburguesa Grande", "Medallon de carne 90gr, Cheddar y Bacon", 2000, "./Image/Hamburguesa-CheddarYBacon.jpg");
const hamburguesaCompleta = new Producto ("hamburguesa03","Hamburguesa Completa", "Medallon de carne 90gr con Cheddar y Bacon, Lechuga y Tomate", 2500, "./Image/Hamburguesa-QuesoLechugaYTomate.jpg");
const hamburguesaEspecial = new Producto ("hamburguesa04","Hamburguesa Especial", "Medallon de carne 90g con Cheddar y Bacon, Lechuga, Tomate y salsa especial La Fiesta", 3000, "./Image/Hamburguesa-Especial.jpg");



const papasSimple = new Producto ("acompaniamiento01", "Papas Simple", "Papas fritas con queso Cheddar", 500, "./Image/Papas-ConCheddar.jpg");
const papasCompletas = new Producto ("acompaniamiento02", "Papas Completas", "Papas fritas con Cheddar, Bacon y Verdeo", 1000, "./Image/Papas-CheddarBaconYVerdeo.jpg");
const nachos = new Producto ("acompaniamiento03", "Nachos", "Nachos con queso Cheddar", 600, "./Image/Nachos-ConCheddar.webp");
const ensalada = new Producto ("acompaniamiento04", "Ensalada", "Ensalada con Lechuga, Tomate, Cebolla y condimento", 1000, "./Image/Ensalada.jpg");


const cocaCola = new Producto ("bebida01", "Coca Cola", "", 500, "./Image/Coca.jpg");
const cocaZero = new Producto ("bebida02", "Coca Zero", "", 500, "./Image/CocaZero.jpg");
const sprite = new Producto ("bebida03", "Sprite", "", 500, "./Image/Sprite.jpg");
const spriteZero = new Producto ("bebida04", "Sprite Zero", "", 500, "./Image/Sprite.jpg");
const agua = new Producto ("bebida05", "Agua", "", 400, "./Image/Agua.jpg");
const heineken = new Producto ("bebida06", "Cerveza Heineken", "", 600, "./Image/CervezaHeineken.jpg");
const corona = new Producto ("bebida07", "Cerveza Corona", "", 700, "./Image/CervezaCorona.jpg");
const fanta = new Producto ("bebida08", "Fanta", "", 500, "./Image/fanta.jpg");
const schneider = new Producto ("bebida09", "Schneider", "", 600, "./Image/Cerveza-Schneider.jpg");

/** HAMBURGUESAS */
const hamburguesas = [];
hamburguesas.push(hamburguesaSimple, hamburguesaGrande, hamburguesaCompleta, hamburguesaEspecial);

/** ACOMPAÑAMIENTO */
const acompaniamientos = [];
acompaniamientos.push(papasSimple, papasCompletas, nachos, ensalada);

/** BEBIDAS */
const bebidas = [];
bebidas.push(cocaCola, cocaZero, sprite, spriteZero, fanta, agua, heineken, corona, schneider);

/** TODOS LOS PRODCUTOS */
const todosLosProductos = hamburguesas.concat(acompaniamientos, bebidas);


const cuerpo = document.querySelector("#cuerpo");
const verMiCarrito = document.querySelector(".ver-mi-carrito");
const numerito = document.querySelector("#numerito");

verMiCarrito.addEventListener("click", verCarritoDeCompras);

const productosEnCarrito = [];

function verCarritoDeCompras(){
    cuerpo.innerHTML = "";
    
    const botonRegresar = document.createElement("button");
    botonRegresar.classList.add("boton-regresar");
    botonRegresar.innerText = "Regresar";

    productosEnCarrito.forEach(producto => {
        cuerpo.classList.add("hero-cuerpo5")
        const div = document.createElement("div");
        div.classList.add("hero-contenedor2");
        div.innerHTML = `
            <div class="producto">
                <img class="producto__imagen" src= "${producto.imagen}" alt="${producto.nombre}">
                <div class="producto__detalles">
                    <h3 class="producto__titulo">${producto.nombre}</h3>
                    <p class="producto__precio">$${producto.precio}</p>
                    <button class="producto-eliminar" id="${producto.id}">Eliminar</button>
                </div>
            </div>
        `
        cuerpo.append(botonRegresar);
        cuerpo.append(div);

        botonRegresar.addEventListener("click", mostrarMain);
    })
}







function actualizarBotonesAgregar(){
    productoAgregar = document.querySelectorAll(".producto-agregar");

    productoAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

function agregarAlCarrito(e){
    const idBoton = e.currentTarget.id;
    const productoAgregado = todosLosProductos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    acutalizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function acutalizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}




function mostrarMain() {
    cuerpo.innerHTML = "";
    cuerpo.classList.remove("hero-cuerpo2");
    cuerpo.classList.remove("hero-cuerpo3");
    cuerpo.classList.remove("hero-cuerpo4");
    const div = document.createElement("div");
    div.classList.add("cuerpo-hero");
    div.innerHTML = `
    <div id="hero-texto" class="hero-texto">
        <p>No te conformes con cantidad, busca calidad, y no te pierdas esta oportunidad</p>
    </div>
    <div id="hero-boton-producto" class="hero-boton-producto">
        <button id="hero-boton-hamburguesa" class="hero-boton">Hamburguesas</button>
        <button id="hero-boton-acompaniamiento" class="hero-boton">Acompañamientos</button>
        <button id="hero-boton-bebidas" class="hero-boton">Bebidas</button>
    </div>
    <div id="hero-boton-todos" class="hero-boton-todos">
        <button id="hero-boton-todolosproductos" class="hero-boton">Todos los productos</button>
    </div>
    `
    cuerpo.append(div);

const cuerpoHero = document.querySelector(".cuerpo-hero");
const heroBotonProducto = document.querySelector("#hero-boton-producto");
const heroBotonTodos = document.querySelector("#hero-boton-todos");
const heroTexto = document.querySelector("#hero-texto");
const heroBotonHamburguesa = document.querySelector("#hero-boton-hamburguesa");
const heroBotonAcompaniamiento = document.querySelector("#hero-boton-acompaniamiento");
const heroBotonBebidas = document.querySelector("#hero-boton-bebidas");
const heroBotonTodosLosProductos = document.querySelector("#hero-boton-todolosproductos");

heroBotonHamburguesa.addEventListener("click", () => seleccionDeHamburguesas());
heroBotonAcompaniamiento.addEventListener("click", () => seleccionDeAcompaniamiento());
heroBotonBebidas.addEventListener("click", () => seleccionDeBebidas());
heroBotonTodosLosProductos.addEventListener("click", () => seleccionTodo());
}
mostrarMain();





function seleccionDeHamburguesas() {
    cuerpo.innerHTML = "";
    
    const botonRegresar = document.createElement("button");
    botonRegresar.classList.add("boton-regresar");
    botonRegresar.innerText = "Regresar";

    hamburguesas.forEach(producto => {
        cuerpo.classList.add("hero-cuerpo2")
        const div = document.createElement("div");
        div.classList.add("hero-contenedor2");
        div.innerHTML = `
            <div class="producto">
                <img class="producto__imagen" src= "${producto.imagen}" alt="${producto.nombre}">
                <div class="producto__detalles">
                    <h3 class="producto__titulo">${producto.nombre}</h3>
                    <p class="producto__precio">$${producto.precio}</p>
                    <button class="producto-agregar" id="${producto.id}">Agregar</button>
                </div>
            </div>
        `
        cuerpo.append(botonRegresar);
        cuerpo.append(div);

        botonRegresar.addEventListener("click", mostrarMain);
    })

    actualizarBotonesAgregar();
}

function seleccionDeAcompaniamiento() {
    cuerpo.innerHTML = "";

    const botonRegresar = document.createElement("button");
    botonRegresar.classList.add("boton-regresar");
    botonRegresar.innerText = "Regresar";

    acompaniamientos.forEach(producto => {
        cuerpo.classList.add("hero-cuerpo2");
        const div = document.createElement("div");
        div.classList.add("hero-contenedor2");
        div.innerHTML = `
            <div class="producto">
                <img class="producto__imagen" src= "${producto.imagen}" alt="${producto.nombre}">
                <div class="producto__detalles">
                    <h3 class="producto__titulo">${producto.nombre}</h3>
                    <p class="producto__precio">$${producto.precio}</p>
                    <button class="producto-agregar" id="${producto.id}">Agregar</button>
                </div>
            </div>
        `
        cuerpo.append(botonRegresar);
        cuerpo.append(div);

        botonRegresar.addEventListener("click", mostrarMain);
    })

    actualizarBotonesAgregar();
}

function seleccionDeBebidas() {
    cuerpo.innerHTML = "";

    const botonRegresar = document.createElement("button");
    botonRegresar.classList.add("boton-regresar");
    botonRegresar.innerText = "Regresar";

    bebidas.forEach(producto => {
        cuerpo.classList.add("hero-cuerpo3");
        const div = document.createElement("div");
        div.classList.add("hero-contenedor2");
        div.innerHTML = `
            <div class="producto">
                <img class="producto__imagen" src= "${producto.imagen}" alt="${producto.nombre}">
                <div class="producto__detalles">
                    <h3 class="producto__titulo">${producto.nombre}</h3>
                    <p class="producto__precio">$${producto.precio}</p>
                    <button class="producto-agregar" id="${producto.id}">Agregar</button>
                </div>
            </div>
        `
        cuerpo.append(botonRegresar);
        cuerpo.append(div);

        botonRegresar.addEventListener("click", mostrarMain);
    })

    actualizarBotonesAgregar();
}

function seleccionTodo() {
    cuerpo.innerHTML = "";

    const botonRegresar = document.createElement("button");
    botonRegresar.classList.add("boton-regresar");
    botonRegresar.innerText = "Regresar";

    todosLosProductos.forEach(producto => {
        cuerpo.classList.add("hero-cuerpo4");
        const div = document.createElement("div");
        div.classList.add("hero-contenedor2");
        div.innerHTML = `
            <div class="producto">
                <img class="producto__imagen" src= "${producto.imagen}" alt="${producto.nombre}">
                <div class="producto__detalles">
                    <h3 class="producto__titulo">${producto.nombre}</h3>
                    <p class="producto__precio">$${producto.precio}</p>
                    <button class="producto-agregar" id="${producto.id}">Agregar</button>
                </div>
            </div>
        `
        cuerpo.append(botonRegresar);
        cuerpo.append(div);

        botonRegresar.addEventListener("click", mostrarMain);
    })

    actualizarBotonesAgregar();
}

