//Selection des id de l'élément HTML
const cartItem = document.getElementById('cart__items');
const qteItem = document.getElementById('totalQuantity');
const totalPriceItem = document.getElementById('totalPrice');

//Fonction pour afficher les données en injectant le HTML
const displayToCart = product =>{
   
    cartItem.innerHTML += `
        <article class="cart__item" data-id="${product.id}">
            <div class="cart__item__img">
                <img src="${product.imageUrl}" alt="${product.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__titlePrice">
                    <h2>${product.name}</h2>
                    <p>${product.price} \u20ac</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`;      
}

//Suppression d'un élément produit
const removeProduct = () =>{

}


//Si le localStorage est vide
if(!localStorage.length){
  let cartEmpty = document.createElement('p');
  let achat = document.createElement('a');
  cartEmpty.innerHTML = "Votre panier est vide";
  cartEmpty.style = "text-align:center;font-size:30px";
  cartItem.style = "margin-bottom:20px";
  achat.setAttribute("href", "./index.html");
  achat.setAttribute("class","item__achat__continue");
  achat.style = "display:block;text-align:center;text-transform:uppercase;background-color:white;text-decoration:none;width: 50%;margin: 0 auto;padding-top: 20px;padding-bottom: 20px";
  achat.innerHTML = "Continuer mes achats";
  cartItem.appendChild(cartEmpty);
  cartItem.appendChild(achat);

  qteItem.innerHTML = 0;
  totalPriceItem.innerHTML = 0;
    
}else{
    let products = []
    for(let i=0; i<localStorage.length;i++){
        let dataProducts = JSON.parse(localStorage.getItem(localStorage.key(i)));
        products.push(dataProducts.totalPrice);
        displayToCart(dataProducts);

        //Selection de l'élémént deleteItem
        const deleteCart = document.querySelector(".deleteItem");
        //On écoute l'élémént deleteItem, au clique on supprime le produit correspondant
        deleteCart.addEventListener(("click"), () => {
          localStorage.removeItem(dataProducts.id + dataProducts.colorSelected);
        });
    }
    console.log(products);
    let totalPrice=0;
    for(let j=0;j<products.length;j++){
        totalPrice += products[j];
    }
    //Le nombre de produits injecté dans le html
    qteItem.innerHTML = products.length;
    //Le prix total injecté dans le html
    totalPriceItem.innerHTML = totalPrice;   
}

//clearCarts();









