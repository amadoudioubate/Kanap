//Selection de l'id de l'items
const itemsElt = document.getElementById('items');

/**
 * Affiche les données de produit en injectant html dans la page d'acceuil 
 * @param {produits à afficher} product 
 */
const displayToProduct = product =>{
    // Création des éléments html
    let linkElt = document.createElement("a");
    let articleElt = document.createElement("article");
    let imgElt = document.createElement("img");
    let nameElt = document.createElement("h3");
    let descriptionElt = document.createElement("p");
            
    // Création des attributs associés aux éléménts html crées 
    linkElt.setAttribute("href",`../html/product.html?id=${product._id}`);
    imgElt.setAttribute("src", product.imageUrl);
    imgElt.setAttribute("alt", product.altTxt);
    nameElt.setAttribute("class", "productName");
    descriptionElt.setAttribute("class", "productDescription");

    // Ajout des éléments enfants sur les éléments parents
    articleElt.appendChild(imgElt);
    articleElt.appendChild(nameElt);
    articleElt.appendChild(descriptionElt);
    linkElt.appendChild(articleElt);
    itemsElt.appendChild(linkElt);
            
    nameElt.innerText = product.name;
    descriptionElt.innerText = (product.description).substr(1,45)+"...";
}

/**
 * affiche le message d'erreur si les produits ne se chargent pas 
 * @param {item parent qui englobera item erreur} elt 
 * @param {texte erreur à afficher} txtError 
 */
const displayToMessageError = (elt,txtError) => {
    let errors = document.createElement('p');
    errors.setAttribute('class', 'errors');
    errors.innerText = txtError;
    elt.appendChild(errors);
}


/**
 * Affiche les produits dans la page d'acceuil
 */
async function loadProduct() {
    fetch('http://localhost:3000/api/products')
    .then(reponse => reponse.json())
    .then(data => {
        //Création des éléments HTML
        for(let dataProduct of data) {
            displayToProduct(dataProduct);
        }
    })
    .catch (() => {
        alert("Attention votre serveur en local Nodejs n'est pas lancé, veuillez contacter l'administrateur du site");
        displayToMessageError(itemsElt,"Nous sommes désolés aucun produit n'est disponible, veuillez réessayer ultérieurement");
    })
}
loadProduct();