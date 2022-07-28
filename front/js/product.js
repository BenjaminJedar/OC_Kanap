let urlParam = window.location.href;
let url = new URL(urlParam);
let productId = urlParam.searchParams.get("id")

const imgProduct = document.querySelector(".item__img");
const titleProduct = document.querySelector("#title");
const descriptionProduct = document.querySelector("#description");
const colorProduct = document.querySelector("#color");

fetch("http://localhost:3000/api/products" + productId)
    .then(function (res) {
        //On récupère la promise et on la convertit au format json
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (product) {
        imgProduct.innerHTML = `<img src="${imageUrl}" alt="Photographie d'un canapé">`

    })