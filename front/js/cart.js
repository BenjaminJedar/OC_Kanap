const items = document.querySelector("#cart__items");

let localStorageProductsJson = localStorage.getItem("cart");
let localStorageProducts = JSON.parse(localStorageProductsJson);

function insertElements() {
    fetch("http://localhost:3000/api/products" + "/" + localStorageProducts.id)
        .then(function (res) {
            //On récupère la promise et on la convertit au format json
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (product) {
            items.innerHTML = items.innerHTML + `<article class="cart__item" data-id="${localStorageProducts.id}" data-color="${localStorageProducts.color}">
            <div class="cart__item__img">
              <img src="${product.imageUrl}" alt="${product.altTxt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${product.name}</h2>
                <p>${localStorageProducts.color}</p>
                <p>${product.price}</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${localStorageProducts.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>`

        })
};

insertElements();