let url = new URL(window.location.href);
let productId = url.searchParams.get("id")

const img = document.querySelector(".item__img");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const price = document.querySelector("#price");
const colors = document.querySelector("#colors");


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
        }
    }
    localStorage.setItem("cart", JSON.stringify(productCartInfo));
    alert("Produit ajouté au panier !");
}
}
)


