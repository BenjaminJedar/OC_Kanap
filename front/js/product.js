const img = document.querySelector(".item__img");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const price = document.querySelector("#price");
const colors = document.querySelector("#colors");

const productImg = document.createElement("img");


let url = new URL(window.location.href);
let productId = url.searchParams.get("id")
let urlApi = "http://localhost:3000/api/products";

let arrayProduct = [];

fetch(urlApi + "/" + productId)
    .then(function (res) {
        //On récupère la promise et on la convertit au format json
        if (res.ok) {
            return res.json();
        }
    })
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
    });

const color = document.querySelector("#colors");
const quantity = document.querySelector("#quantity");
const addButton = document.querySelector("#addToCart");

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
 
        updateCart(productCartInfo);
        alert("Produit ajouté au panier !")
    }

});


