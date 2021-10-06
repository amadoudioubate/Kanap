const item = document.querySelector('.item')

const buttonaddToCartItem = document.getElementById('addToCart');
const itemMessageError = document.querySelector(".item__message__error");

const displayProduct = product => {
    let option = "";
    let imgItem = document.querySelector('.item__img');
    let titleItem = document.getElementById('title');
    let priceItem = document.getElementById('price');
    let descriptionItem = document.getElementById('description');
    let colorsSelectEltItem = document.getElementById('colors');
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
    colorsSelectEltItem.innerHTML = option;        
}

//Fonction pour afficher le message d'erreur si le fetch se passe mal 
const displayToMessageError = (itemError,txtError) => {
    let errorsItem = document.createElement('p');
    errorsItem.setAttribute('class', 'errors');
    errorsItem.innerText = txtError;
    itemError.appendChild(errorsItem);
}

//Récuperer les données de l'URL
const searchParams = new URLSearchParams(window.location.search);

//Si le paramètre id existe
if(searchParams.has('id')){
    let idProduct = searchParams.get("id");
    fetch(`http://localhost:3000/api/products/${idProduct}`)
        .then(response => response.json())
        .then(data => {
            //Affichage dynamique du nom de produit
            document.title = data.name;
            //Appel de la fonction displayProduct
            displayProduct(data);
            //On écoute le bouton ajouter au panier
            buttonaddToCartItem.addEventListener('click', event =>{
                event.preventDefault();
                 
                let quantity = document.getElementById('quantity').value; 
                if(quantity >0 && quantity <=100){
                    let products = {
                        id: data._id,
                        name: data.name,
                        imageUrl: data.imageUrl,
                        altTxt: data.altTxt,
                        colorSelected: document.getElementById('colors').value,
                        quantity: quantity,
                        price: data.price,
                        totalPrice: data.price * quantity
                    };
            
                    let productItemInLocalStorage = JSON.parse(localStorage.getItem(products.id + products.colorSelected));
                    if(productItemInLocalStorage !== null){
                        products.quantity = parseInt(products.quantity) + parseInt(productItemInLocalStorage.quantity);
                        products.totalPrice = products.price * products.quantity;
                        localStorage.setItem(products.id + products.colorSelected, JSON.stringify(products));
                        
                    }else{
                        localStorage.setItem(products.id + products.colorSelected, JSON.stringify(products));
                    }
                    //let itemConfirmation = querySelector(".item__confirmation");
                    itemMessageError.style = "display:none";
                    
                }else{
                    itemMessageError.innerHTML = "La quantité doit être comprise entre 1-100";
                    itemMessageError.style = "display:flex;justify-content:center;align-items:center";
                }
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
