//Pointage des différents éléments
const img = document.querySelector(".item__img");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const price = document.querySelector("#price");
const colors = document.querySelector("#colors");

const productImg = document.createElement("img");

//Création d'une variable contenant l'url de la page actuelle
let url = new URL(window.location.href);
//Récupération de l'id contenu dans l'url de la page actuelle
let productId = url.searchParams.get("id")
let urlApi = "http://localhost:3000/api/products";
//Initialisation d'un tableau de produit
let arrayProduct = [];

//Utilisation de fetch pour cibler un produit en particulier dans l'API grâce à son id
fetch(urlApi + "/" + productId)
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .catch(function (error){
        console.log("erreur :" + error);
    })
    //Affichage des caractéristiques du produit 
    .then(function (product) {
        //Création de l'img du produit
        img.appendChild(productImg);
        productImg.src = product.imageUrl;
        productImg.alt = product.altTxt;

        //Création du nom du produit
        title.innerHTML = product.name;

        //Création du prix du produit
        price.innerHTML = product.price;

        //Création de la description du produit
        description.innerHTML = product.description;

        //Création des différentes options de couleur
        for (let i = 0; i < product.colors.length; i++) {
            const colorOption = document.createElement("option");
            colors.appendChild(colorOption);
            colorOption.value = product.colors[i];
            colorOption.innerHTML = `${product.colors[i]}`;
        };
    })
    .catch(function (error){
        console.log("erreur :" + error);
    });

//Pointages des élément de couleur, quantité et du bouton d'ajout au panier    
const color = document.querySelector("#colors");
const quantity = document.querySelector("#quantity");
const addButton = document.querySelector("#addToCart");

/*Mise en place d'un événement de type "click" permettant 
l'ajout au panier avec des conditions qui varrifies la 
bonne utilisation par l'utilisateur*/
addButton.addEventListener("click", pushCart => {
    if (color.value === "") {
        alert("Veuillez choisir une couleur");
    }
    else if (quantity.value == 0) {
        alert("Quantité minimale : 1")
    }
    else if (quantity.value > 100) {
        alert("Le nombre maximal de produits pour la commande est 100")
    }
    /*Si l'utilisateur respecte toutes les conditions, 
    alors un objet contenant toutes les informations du 
    produit selectionné est créée*/
    else if (quantity.value > 0 && quantity.value < 100) {
        const productCartInfo = {
            id: productId,
            color: colors.value,
            quantity: quantity.value,
            img: img.querySelector("img").src,
            img_alt : img.querySelector("img").alt,
            name: title.textContent,
            description: description.textContent,
            price: price.textContent,
        }
        //Mise à jour du panier avec ajout du nouveau produit selectionné
        updateCart(productCartInfo);
    }

});


