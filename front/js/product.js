let url = new URL(window.location.href);
let productId = url.searchParams.get("id")

const img = document.querySelector(".item__img");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const colors = document.querySelector("#colors");
const price = document.querySelector("#price");
const button = document.querySelector(".item__content__addButton");

fetch("http://localhost:3000/api/products" + "/" + productId)
    .then(function (res) {
        //On récupère la promise et on la convertit au format json
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (product) {
        img.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
        title.textContent = `${product.name}`;
        price.textContent = `${product.price}`;
        description.textContent = `${product.description}`;

        for (let i = 0; i < product.colors.length; i++) {
            colors.innerHTML = colors.innerHTML + `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
        };
    });

button.innerHTML = `<a href="./cart.html?id=${productId}"><button id="addToCart">Ajouter au panier</button></a>`;

