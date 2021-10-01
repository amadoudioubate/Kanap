//Selection de l'id de l'items
const itemsElt = document.getElementById('items');

//Fonction pour injecter html dans la page produit
const displayToProduct = product =>{
    let linkElt = document.createElement("a");
    let articleElt = document.createElement("article");
    let imgElt = document.createElement("img");
    let nameElt = document.createElement("h3");
    let descriptionElt = document.createElement("p");
            
    //Création des attributs associés aux éléménts HTMT crées 
    linkElt.setAttribute("href",`../html/product.html?id=${product._id}`);
    imgElt.setAttribute("src", product.imageUrl);
    imgElt.setAttribute("alt", product.altTxt);
    nameElt.setAttribute("class", "productName");
    descriptionElt.setAttribute("class", "productDescription");

    //Ajout des éléments enfants sur les éléments parents
    articleElt.appendChild(imgElt);
    articleElt.appendChild(nameElt);
    articleElt.appendChild(descriptionElt);
    linkElt.appendChild(articleElt);
    itemsElt.appendChild(linkElt);
            
    nameElt.innerText = product.name;
    descriptionElt.innerText = (product.description).substr(1,45)+"...";
}

const displayToMessageError = (elt,txtError) => {
    let errors = document.createElement('p');
    errors.setAttribute('class', 'errors');
    errors.innerText = txtError;
    elt.appendChild(errors);
}

fetch('http://localhost:3000/api/products')
    .then(reponse => reponse.json())
    .then(data => {
        //Création des éléments HTML
        for(let dataProduct of data) {
            displayToProduct(dataProduct);
        }
    })
    .catch (() => {
        displayToMessageError(itemsElt,"Désolé aucun produit n'est disponible");
    })