/**
 * fonction pour injecter html dans la page d'acceuil
 * @param {Object} product 
 */
const displayToProduct = product => {
    let option = "";
    let imgItem = document.querySelector('.item__img');
    let titleItem = document.getElementById('title');
    let priceItem = document.getElementById('price');
    let descriptionItem = document.getElementById('description');
    let colorsSelectItem = document.getElementById('colors');
    let img = document.createElement('img');
    img.setAttribute("src", product.imageUrl);
    img.setAttribute("alt", product.altTxt);
    imgItem.appendChild(img);
    titleItem.innerText = product.name;
    priceItem.innerText = product.price;
    descriptionItem.innerText = product.description;

    product.colors.forEach(colors => {
        option +=`<option value="${colors}">${colors}</option>`;
    });    
    colorsSelectItem.insertAdjacentHTML("beforeend", option);   
}

/**
 * Affiche un message d'erreur  
 * @param {*} itemError 
 * @param {*} txtError 
 */
const displayToMessageError = (itemError,txtError) => {
    let errorsItem = document.createElement('p');
    errorsItem.setAttribute('class', 'errors');
    errorsItem.innerText = txtError;
    itemError.appendChild(errorsItem);
}

//fenêtre pop-up
const ConfirmationAddProduct = (quantity,name,color) =>{
    if(window.confirm(`Votre commande de ${quantity} ${name} ${color} est ajoutée au panier
    Pour consulter votre panier, cliquez sur OK`)){
        window.location.href ="cart.html";
    }
}
/**
 * Ajoute un produit dans le panier
 * @param {Object} product 
 */
const addProduct = product =>{
    let itemMessageError = document.querySelector(".item__message__error");
    let itemConfirmation = document.querySelector(".item__confirmation");
    let quantity = document.getElementById('quantity').value; 
    let colorSelected = document.getElementById('colors').value;
    // Si la couleur est choisie
    if(document.getElementById('colors').value !== ""){
        // Si la quantité est supérieure à 0 et inférieure ou égale à 100, on crée l'objet produit
        if(quantity >0 && quantity <=100){
            let products = {
                id: product._id,
                name: product.name,
                imageUrl: product.imageUrl,
                altTxt: product.altTxt,
                colorSelected: colorSelected,
                quantity: parseInt(quantity),
                price: product.price,
                totalPrice: product.price * quantity
            };

            let productItemInLocalStorage = JSON.parse(localStorage.getItem(products.id + products.colorSelected));
            if(productItemInLocalStorage !== null){
                products.quantity = parseInt(products.quantity) + parseInt(productItemInLocalStorage.quantity);
                products.totalPrice = products.price * products.quantity;
                localStorage.setItem(products.id + products.colorSelected, JSON.stringify(products));
               
                //itemMessageError.style = "display:none";
                //validation(itemConfirmation,"Un produit est ajouté avec succès à votre panier");
                ConfirmationAddProduct(quantity,products.name,colorSelected);
                
            }else{
                localStorage.setItem(products.id + products.colorSelected, JSON.stringify(products));
                //itemMessageError.style = "display:none";
                //validation(itemConfirmation,"Un produit est ajouté avec succès à votre panier");
                ConfirmationAddProduct(quantity,products.name,colorSelected);
            }
            
        }else{
            itemConfirmation.style = "display:none";
            validation(itemMessageError,"La quantité doit être comprise entre 1-100");
        }        
    }else{
        itemConfirmation.style = "display:none";
        validation(itemMessageError,"Veuillez selectionné une couleur");
    }   
}

/**
 * Affiche un message de succès ou erreur 
 * @param {*} elt 
 * @param {*} txt 
 */
const validation = (elt,txt) =>{
    elt.innerHTML = txt;
    elt.style = "display:flex;justify-content:center;align-items:center";
}

/**
 *  Affiche un produit selectionné dans la page produit selon son id
 */
async function loadProduct(){
    let item = document.querySelector('.item')
    //Récuperer les données de l'URL
    let searchParams = new URLSearchParams(window.location.search);

    //Si le paramètre id existe
    if(searchParams.has('id')){
        let idProduct = searchParams.get("id");
        fetch(`http://localhost:3000/api/products/${idProduct}`)
            .then(response => response.json())
            .then(data => {
                //Affichage dynamique du nom de produit comme titre de la page
                document.title = data.name;
                //Appel de la fonction displayToProduct
                displayToProduct(data);
                //On écoute le bouton ajouter au panier
                document.getElementById('addToCart').addEventListener('click', event =>{
                    event.preventDefault();
                    addProduct(data);      
                })
            })
            .catch (() => {
                let articleItem = document.querySelector('article');
                articleItem.remove();
                displayToMessageError(item,"Veuillez-nous excuser une erreur s'est produite , réessayer plus tard");
            })
    }else{
        window.location.href = "../html/index.html";
    }

}

loadProduct();