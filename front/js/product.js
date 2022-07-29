let url = new URL(window.location.href);
let productId = url.searchParams.get("id")

const img = document.querySelector(".item__img");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const color = document.querySelector("#color");
const price = document.querySelector("#price");

fetch("http://localhost:3000/api/products" + productId) 
    .then(function (res) {
        //On récupère la promise et on la convertit au format json
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (product) {
        console.log(product[0].name);
    })