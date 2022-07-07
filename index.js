import { getProducts, getProductById } from "./firebase.js";

let cart =[];

let total = 0;

const updateTotal = (price) => {

    const totalBox = document.querySelector(`.totalContainer`);

    total += price;

    totalBox.textContent = total;
    
}

const alreadyInCart = (id) => {
    
    if(cart.some(product => product.id===id)){

        return true;

    }else{

        return false;

    };

};

const emptyCart = () => {

    if(cart.length===0){
        
        Swal.fire(
            'Error!',
            'No hay productos en el carrito.',
            'error'
        );

    }else{

        cart = [];

        total = 0;

        renderCart();

        const totalBox = document.querySelector(`.totalContainer`);

        totalBox.textContent = total;

        Swal.fire(
            'Carrito vacio!',
            'Se ha vaciado el carrito.',
            'info'
        );

    }
    
}

const checkout = () => {

    if(cart.length===0){
        
        Swal.fire(
            'Error!',
            'No hay productos en el carrito.',
            'error'
        );

    }else{

        emptyCart();
            
        Swal.fire(
            'Felicidades!',
            'Finalizaste tu compra con éxito',
            'success'
        );
    
    }
   

}

const renderCart = () => {

    const cartContainer = document.querySelector('.cartContainer');

    cartContainer.innerHTML = ``;
    
    cart.forEach(productInCart => {

        const cartCard = document.createElement('div');

        cartCard.className = `card mb-3`;

        cartCard.innerHTML = `
        
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src=${productInCart.data().img} class="img-fluid rounded-start" alt=${productInCart.data().name}>
                    </div>
                    <div class="col-md-7">                   
                        <div class="card-body">   
                            <h5 class="card-title">${productInCart.data().name}</h5>
                            <p class="card-text">$${productInCart.data().price}</p>
                            
                        </div>
                    </div>
                </div>
            
            </div>
        
        `;

        cartContainer.append(cartCard);

    });
    
}

const addToCart = async (e) => {

    let productId = e.target.id;

    if(alreadyInCart(productId)){

        // console.log("repetido");
    
    }else{

        const productToCart = await getProductById(productId);

        cart.push(productToCart);

        updateTotal(productToCart.data().price);

        renderCart(); 

    };
}

const addEventToBuyBtns = async () => {
    
    const buyBtns = document.querySelectorAll('.buyBtn');

    buyBtns.forEach(buyBtn =>{

        buyBtn.addEventListener('click',addToCart);

    });


}

const renderCards = async (productsResponse) => {

    const products = await productsResponse;

    const deck = document.querySelector('.deck');
    
    products.forEach(product => {

        const card = document.createElement('div');
        
        card.className = 'card';
        
        card.innerHTML = `
        
            <div class="card" style="width: 18rem;">
                <img src=${product.data().img} class="card-img-top" alt=${product.data().name}>
                <div class="card-body">
                    <h5 class="card-title">$${product.data().price}</h5>
                    <p class="card-text">${product.data().name}</p>
                    <button href="#" id="${product.id}" class="btn btn-dark buyBtn">Agregar al carrito</button>
                </div>
            </div>
        `;
        
        deck.append(card);

    });

    addEventToBuyBtns();


}

renderCards(getProducts());

const emptyBtn = document.querySelector(`.emptyBtn`);

const finishBtn = document.querySelector(`.finishBtn`);

emptyBtn.addEventListener(`click`, emptyCart);

finishBtn.addEventListener(`click`, checkout);