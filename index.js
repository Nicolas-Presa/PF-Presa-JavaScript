let products = []
let cart = JSON.parse(localStorage.getItem('product-in-cart')) || [];

fetch("./products.json")
    .then(response => response.json())
    .then(data => {
        products = data;
        productsButtons()
        updateQuantity()
    })

const title = document.querySelector('.title');
const cartButton = document.querySelector('.cart__button');
const background = document.querySelector('.background__container');
const main = document.querySelector('.hero__container');
const quantity = document.querySelector('.cart__quantity');



function productos(productOption) {
    main.innerHTML = '';
    main.classList.remove('hero__container', 'cart__container')
    main.classList.add('products__container');
    const backButton = document.createElement('div');

    productOption.forEach((product) => {
        const div = document.createElement('div');
        div.classList.add('product');
        div.innerHTML = `
        <div class="container">
        <img class="product__thumbnails" src=${product.thumbnails} alt="image">
        <h1 class="product__title"> ${product.name} </h1>
        <p class="product__price"> $${product.price} </p>
        <button class="product__add" id=${product.id}> Agregar al carrito </button>
        </div>
        `
        main.append(div)

        backButton.innerHTML = `
        <button class="button__back"> Regresar </button>
        `
        main.appendChild(backButton);
    })
    updateButton();

}

function productsButtons(){
    const buttons = document.querySelectorAll('.button');

    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            if(e.currentTarget.id != 'todos'){
                const productButton = products.filter(product => product.category === e.currentTarget.id)
                productos(productButton);
            }else{
                productos(products);
            }
        })
    })
}

function updateButton() {
    addButton = document.querySelectorAll('.product__add');
    backButton = document.querySelector('.button__back');
    buttonCart = document.querySelector('#button__back');
    buttonPay = document.querySelector('#button__pay');
    buttonEmpty = document.querySelector('#button__empty');
    buttonDelete = document.querySelectorAll('.button__delete');

    addButton.forEach(button => {
        button.addEventListener('click', addCart);
    });

    backButton?.addEventListener('click', back);
    buttonCart?.addEventListener('click', back);
    buttonPay?.addEventListener('click', pay);
    buttonEmpty?.addEventListener('click', empty);

    buttonDelete.forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

function addCart(e) {
    const id = parseInt(e.currentTarget.id);
    const addProduct = products.find(product => product.id === id)
    const indexProduct = cart.findIndex(product => product.id === id)

    if(indexProduct != -1){
        cart[indexProduct].cantidad += 1;
    }else{
        addProduct.cantidad = 1
        cart.push(addProduct)
    }

    updateQuantity();
    localStorage.setItem('product-in-cart', JSON.stringify(cart));
}

function back() {
    main.innerHTML = '';
    main.classList.remove('products__container', 'cart__container');
    main.classList.add('hero__container');

    main.innerHTML = `
    <div id="hero__text" class="hero__text">
        <p>No te conformes con cantidad, busca calidad, y no te pierdas esta oportunidad</p>
    </div>
    <div id="hero__buttons" class="hero__buttons">
        <button id="hamburguesa" class="button">Hamburguesas</button>
        <button id="acompaniamiento" class="button">Acompañamientos</button>
        <button id="bebida" class="button">Bebidas</button>
    </div>
    <div id="hero__button__all" class="hero__button__all">
        <button id="todos" class="button">Todos los productos</button>
    </div>
    `
    productsButtons();
}

function seeCart() {
    if(cart.length <= 0){
        Swal.fire({
            title: 'Tu carrito esta vacio',
            text: 'Seleccione algun producto para poder realizar la compra',
            icon: 'error',
            confirmButtonText: 'Cerrar'
                }).then(
                    setTimeout(() => {
                        cart = []
                        updateQuantity();
                        localStorage.setItem('product-in-cart', JSON.stringify(cart));
                        back()
                    }, 0)
                );
    }else{
        main.innerHTML = '';
        main.classList.remove('hero__container', 'products__container');
        main.classList.add('cart__container');
        const buttonsContainer = document.createElement('div');

        cart.forEach((product) => {
            const div = document.createElement('div');
            div.classList.add('product__cart');
            div.innerHTML = `
            <h1 class="product__content"> ${product.name} </h1>
            <p class="product__content"> Por unidad ${product.price} </p>
            <p class="product__content"> ${product.cantidad} </p>
            <span class="product__content"> Subtotal: ${product.price * product.cantidad} </span>
            <button id="${product.id}" class="button__delete"> Eliminar producto </button>
            `
            main.append(div)

        buttonsContainer.innerHTML = `
        <div class="buttons__container">
            <button id="button__back" class="button__cart"> Regresar </button>
            <button id="button__pay" class="button__cart"> Pagar </button>
            <span id="button__total" class="button__cart total">TOTAL: ${calculateTotal()} </span>
            <button id="button__empty" class="button__cart"> Vaciar carrito </button>
        </div>
        `

        main.appendChild(buttonsContainer);
        })
        
    }
    updateButton()
}

function updateQuantity() {
    let nuevoNumerito = cart.reduce((acc, producto) => acc + producto.cantidad, 0);
    quantity.innerText = nuevoNumerito;
}

function calculateTotal() {
    return cart.reduce((total, product) => total + (product.price * product.cantidad), 0);
}

cartButton.addEventListener('click', seeCart);

function pay() {
    Swal.fire({
        title: 'Gracias por realizar tu compra',
        text: 'Su pedido sera entregado en los proximos 30 minutos',
        icon: 'success',
        confirmButtonText: 'Cerrar'
            }).then(
                setTimeout(() => {
                    cart = []
                    updateQuantity();
                    localStorage.setItem('product-in-cart', JSON.stringify(cart));
                    back()
                }, 4000)
            );
}

function empty() {
    Swal.fire({
        title: 'Acabas de vaciar tu carrito',
        text: 'Seleccione productos nuevamente para continuar su compra',
        confirmButtonText: 'Cerrar'
            }).then(
                setTimeout(() => {
                    cart = []
                    updateQuantity();
                    localStorage.setItem('product-in-cart', JSON.stringify(cart));
                    back()
                }, 0)
            );
}

function removeFromCart(e) {
    const id = parseInt(e.currentTarget.id);
    const indexProduct = cart.findIndex(product => product.id === id);

    if (indexProduct !== -1) {
        if (cart[indexProduct].cantidad > 1) {
            cart[indexProduct].cantidad -= 1;
        } else {
            cart.splice(indexProduct, 1);
        }
    }

    updateQuantity();
    localStorage.setItem('product-in-cart', JSON.stringify(cart));
    seeCart();
}