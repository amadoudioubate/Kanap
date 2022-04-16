

//Selection des id de l'élément HTML
//const cartItem = document.getElementById('cart__items');
function get(key) {
    if (localStorage) {
     return JSON.parse(localStorage.getItem(localStorage.key(key)));
    }
  
    return null;
}






/**
 * 
 * @param {*} i 
 * @returns 
 */
function getLocalStorage(i){
    return JSON.parse(localStorage.getItem(localStorage.key(i)));
}






/**
 * Affiche les données du produit en injectant le HTML
 * @param {Object} product 
 */
const displayToCart = product =>{
  
    document.getElementById('cart__items').innerHTML += `
        <article class="cart__item" data-id="${product.id}">
            <div class="cart__item__img">
                <img src="${product.imageUrl}" alt="${product.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__titlePrice">
                    <h2>${product.name}</h2>
                    <p>${product.colorSelected}</p>
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

/**
 * Supprime un produit
 * @param {*} basket 
 */
const deleteProduct = basket => {
    localStorage.removeItem(basket);
    window.location.href = "../html/cart.html";
}



/**
 * Calcule le prix total de produit dans panier 
 * @param {int} product 
 */
const getTotalPrice = () => {
    productPrice = [];
    let totalPrice = 0;
    if(productPrice === null){
        totalPrice = 0
    }else{
        for(let i=0; i<localStorage.length;i++){
            let dataProducts = getLocalStorage(i); 
            productPrice.push(dataProducts.totalPrice);
            totalPrice += parseInt(productPrice[i]);
        }
    }
    return totalPrice;
}

/**
 * Calcule la quantité totale de produit dans le panier 
 * @returns int
 */
const getTotalQuantity = () => {
    let totalQuantity=0;
    let itemQuantity = document.querySelectorAll('.itemQuantity');
    if(itemQuantity.length >= 1){
        itemQuantity.forEach(element => totalQuantity += parseInt(element.value))
    }
    return totalQuantity;  
}

/**
 * Affiche la quantité totale et le prix total de produit ajouté dans le panier
 */
const displayTotalQtyAndPrice = () => {
    //Injection html dans la page panier du nombre d'articles
    document.getElementById('totalQuantity').innerHTML = getTotalQuantity();
    //Injection html dans la page panier du prix total d'articles
    document.getElementById('totalPrice').innerHTML = getTotalPrice(); 
}

/**
 * Affiche message quand le panier est vide
 */
const displayBasketEmpty = () => {
    let cartEmpty = document.createElement('p');
    let achat = document.createElement('a');
    cartEmpty.innerHTML = "Votre panier est vide";
    cartEmpty.style = "text-align:center;font-size:30px";
    document.getElementById('cart__items').style = "margin-bottom:20px";
    achat.setAttribute("href", "./index.html");
    achat.setAttribute("class","item__achat__continue");
    achat.style = "display:block;text-align:center;text-transform:uppercase;background-color:white;text-decoration:none;width: 50%;margin: 0 auto;padding-top: 20px;padding-bottom: 20px";
    achat.innerHTML = "Continuer mes achats";
    document.getElementById('cart__items').appendChild(cartEmpty);
    document.getElementById('cart__items').appendChild(achat);
}

function changeQuantity(product) {
    for(let i=0;i<localStorage.length;i++){
        let basket = getLocalStorage(i);
        let productFound = product.find(p => p._id == product._id && p.colorSelected == product.colorSelected);
        productFound.quantity = product.quantity;
        if (productFound.quantity <= 0) {
            basket = product.filter(p => p._id != product._id || p.colorSelected != product.colorSelected);
        }
    }
    
    localStorage.setItem(product.id+product.colorSelected, JSON.stringify(basket))
}

/**
 * Modifie la quantité d'un produit
 */
const modifyQuantityProduct = (product) => {
    let itemQuantity = document.querySelectorAll('.itemQuantity');
    
      
    itemQuantity.forEach(quantityInput => {
        quantityInput.addEventListener("change", (event) => {
            event.preventDefault();
            
            let quantityModifyValue = parseInt(quantityInput.valueAsNumber);
            console.log(quantityModifyValue);
            if(quantityModifyValue >0 && quantityModifyValue <=100){
                product.quantity = quantityModifyValue;  
            }
            console.log(product.quantity);
            
            localStorage.setItem(product.id+product.colorSelected, JSON.stringify(product));
            displayTotalQtyAndPrice();
            //rafraîchir la page
            location.reload();
        });
    });

        
}



/**
 * Affiche les produits dans le panier et prépare les évenements
 */
async function loadProduct(){
    
    //let products =[];
    //S'il y a deja de produit enregistré dans le localStorage
    if(localStorage.length){
        let dataProducts =[]
        for(let i=0; i<localStorage.length;i++){
            dataProducts = getLocalStorage(i); 
            //products.push(dataProducts.id);
                
            displayToCart(dataProducts);
            //On écoute l'élémént deleteItem, au clique on supprime le produit correspondant 
            
            //deleteProduct(dataProducts.id + dataProducts.colorSelected);
            
            
            
        }
        
        
        
        displayTotalQtyAndPrice(); 
        //modifyQuantityProduct();
        modifyQuantityProduct(dataProducts);
         
        checkFormAndPostRequest();
        
        
        
    }else{ //S'il n'ya pas de produit enregistré dans le localStorage
        
        displayBasketEmpty();
        displayTotalQtyAndPrice(); 
    } 
}

loadProduct();

/**
 * Crée un tableau des id produits
 * @returns 
 */
const getListProductId = () =>{
    let productsId = [];
    for(let j=0; j<localStorage.length;j++){
        let dataProducts = getLocalStorage(j); 
        productsId.push(dataProducts.id);
    }
    return productsId;
}
 console.table(getListProductId());

function InvalideInput(input,regex,itemError){
    input.addEventListener('input',(e) =>{
        if(e.target.value ==""){
            itemError.innerHTML = "Veuillez renseigner ce champ";
        }else{
            itemError.innerHTML = "";
        }
    })
    
}

function checkFormAndPostRequest() {

    // On récupère les inputs depuis le DOM.
    
    let firstName = document.getElementById('firstName');
    let lastName = document.getElementById('lastName');
    let address = document.getElementById('address');
    let city = document.getElementById('city');
    let email = document.getElementById('email');
    let btnCommande = document.getElementById('order');
    let regNameValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
    let regEmailValid =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    //let productsId = [];
    //console.log(productsId);
    // Lors d'un clic, si l'un des champs n'est pas rempli ou invalide, on affiche une erreur, on empêche l'envoi du formulaire..
    btnCommande.addEventListener("click", (e) => {
        //Validation prenom
        if(firstName.validity.valueMissing){
            e.preventDefault();
            document.getElementById('firstNameErrorMsg').textContent = "Ce champ est obligatoire";   
        }
        if(!(firstName.validity.valueMissing)){
            e.preventDefault();
            document.getElementById('firstNameErrorMsg').textContent = "";   
        }
        if(regNameValid.test(firstName.value) == false){
            e.preventDefault();
            document.getElementById('firstNameErrorMsg').textContent = "Prénom est invalide";
        } 

        //Validation Nom
        if(lastName.validity.valueMissing){
            e.preventDefault();
            document.getElementById('lastNameErrorMsg').textContent = "Ce champ est obligatoire";
        }
        if(!(lastName.validity.valueMissing)){
            e.preventDefault();
            document.getElementById('lastNameErrorMsg').textContent = "";
        }
        if(regNameValid.test(firstName.value) == false){
            e.preventDefault();
            document.getElementById('lastNameErrorMsg').textContent = "Nom est invalide";
        }

        //Validation adresse
        if(address.validity.valueMissing){
            e.preventDefault();
            document.getElementById('addressErrorMsg').textContent = "Ce champ est obligatoire"
        }
        if(!(address.validity.valueMissing)){
            e.preventDefault();
            document.getElementById('addressErrorMsg').textContent = ""
        }

        //Validation ville
        if(city.validity.valueMissing){
            e.preventDefault();
            document.getElementById('cityErrorMsg').textContent = "Ce champ est obligatoire"
        }
        if(!(city.validity.valueMissing)){
            e.preventDefault();
            document.getElementById('cityErrorMsg').textContent = ""
        }

        //Validation email
        if(email.validity.valueMissing){
            e.preventDefault();
            document.getElementById('emailErrorMsg').textContent = "Ce champ est obligatoire"
        }
        if(!(email.validity.valueMissing)){
            e.preventDefault();
            document.getElementById('emailErrorMsg').textContent = ""
        }
        if(regEmailValid.test(email.value) == false){
            e.preventDefault();
            document.getElementById('emailErrorMsg').textContent = "Email est invalide"
        }else{
            
            // Si le formulaire est valide, le tableau products contiendra un tableau d'objet Product-ID 
            //qui sont les produits achetés, et order contiendra ce tableau ainsi que l'objet qui contient 
            //les infos du client
            
            
            const order = {
                contact: {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    city: city.value,
                    address: address.value,
                    email: email.value
                },
                products: getListProductId()
            };
            console.log(order);
    
            // -------  Envoi de la requête POST au back-end --------
            // Création de l'entête de la requête
            const option = {
                method: "POST",
                body: JSON.stringify(order),
                headers: { "Content-Type": "application/json" },
            };
            console.log(option);
    
            // Envoie de la requête avec l'en-tête. On changera de page avec un localStorage qui ne contiendra plus que l'order id.
            fetch('http://localhost:3000/api/products/order', option)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                console.log(data.orderId);
                localStorage.clear();
                localStorage.setItem("orderId", data.orderId);
                
                //  On peut commenter cette ligne pour vérifier le statut 201 de la requête fetch. Le fait de préciser la destination du lien ici et non dans la balise <a> du HTML permet d'avoir le temps de placer les éléments comme l'orderId dans le localStorage avant le changement de page.
                window.location.href = "../html/confirmation.html";
            })
            .catch((error) => {
                alert("Il y a eu une erreur : " + error.message);
            });
        }
    });
  }

  
  