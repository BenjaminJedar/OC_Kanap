function getCart() {
    let cartArray = JSON.parse(localStorage.getItem("cart"));
    if (Array.isArray(cartArray) == false) {
        cartArray = [];
    }
    return cartArray;
}

function updateCart(newProduit) {
    let cart = getCart();
    let cartIndex = cart.findIndex((element) => element.id === newProduit.id && element.color === newProduit.color);

    if (cartIndex >= 0) {
        cart[cartIndex].quantity = parseInt(cart[cartIndex].quantity);
        newProduit.quantity = parseInt(newProduit.quantity);
        cart[cartIndex].quantity += newProduit.quantity;
        if (cart[cartIndex].quantity > 100) {
            alert("La quantité limite est de 100 articles par commande");
            cart[cartIndex].quantity = 100;
        }
    } else {
        cart.push(newProduit);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Produit ajouté au panier !")
    console.log(cart);
}

function removeProduct() {
    let arrayOfProductToDelete = document.querySelectorAll(".deleteItem");
    let cart = getCart();

    for (let i = 0; i < arrayOfProductToDelete.length; i++) {
        let elementOfProductToDelete = arrayOfProductToDelete[i];
        let targetOfProductToDelete = elementOfProductToDelete.closest("article");

        arrayOfProductToDelete[i].addEventListener("click", () => {
            let deleteProductid = targetOfProductToDelete.dataset.id;
            let deleteProductColor = targetOfProductToDelete.dataset.color;

            for (let j = 0; j < cart.length; j++) {
                if (deleteProductid === cart[i].id && deleteProductColor === cart[i].color) {
                    cart.splice(i, 1);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    if (cart.length === 0) {
                        localStorage.removeItem("cart");
                        location.reload();
                    } else {
                        location.reload();
                    }
                }
            }
        });
    }
}

function showNumberOfArticles() {
    let cart = getCart();
    let qtyArticle = 0;
    for (let i = 0; i < cart.length; i++) {
        qtyArticle += parseInt(cart[i].quantity);
    }
    let totalQuantity = document.querySelector("#totalQuantity");
    totalQuantity.textContent = qtyArticle;
}

function makeTotalPrice() {
    let cart = getCart();
    let totalPrice = 0;
    let priceForProduct = 0;
    for (let i = 0; i < cart.length; i++) {
        priceForProduct = parseInt(cart[i].quantity) * parseInt(cart[i].price);
        totalPrice += priceForProduct;
    }
    let totalCartPrice = document.querySelector("#totalPrice");
    totalCartPrice.textContent = totalPrice;
}

//Requête vers l'API pour récupérer l'objet contenant tous les produits et leurs caractèristiques. la fonction attend la requête avant de poursuivre.
async function getArticle(productId) {
  const catchArticles = await fetch("http://localhost:3000/api/products/" + productId)
    .then((catchArticles) => catchArticles.json())
    .then(function (data) {
      article = data;
    })
  return article;
}

function modifyQuantity() {
    const inputQuantity = document.querySelectorAll(".itemQuantity");
    let cart = getCart();

    for (let i = 0; i < inputQuantity.length; i++) {
        const target = inputQuantity[i].closest("article");
        inputQuantity[i].addEventListener("change", async function () {
            let changingProductid = target.dataset.id;
            let changingProductColor = target.dataset.color;
            let newQty = inputQuantity[i].value;

            for (let j = 0; j < cart.length; j++) {
                const article = await getArticle(cart[i].id);
                if (changingProductid === cart[j].id && changingProductColor === cart[j].color) {
                    cart[j].quantity = newQty;
                    if (newQty != 0) {
                        localStorage.setItem("cart", JSON.stringify(cart));

                        let sumArray = [];
                        let sumProduct = 0;
                        let qtyArray = [];

                        for (let k = 0; k < cart.length; k++) {
                            sumProduct = article.price * cart[k].quantity;
                            sumArray.push(sumProduct);
                            qtyArray.push(Number(cart[k].quantity));
                        }
                        //Faire un reduce et afficher dans le dom le resultat

                        sumArray = sumArray.reduce((a, b) => a + b);
                        qtyArray = qtyArray.reduce((a, b) => a + b);

                        const totalPriceSpan = document.querySelectorAll("#totalPrice");
                        //totalPriceSpan.dataset.price = sumArray;
                        totalPriceSpan.textContent = sumArray;

                        const totalQuantitySpan = document.querySelectorAll("#totalQuantity");
                        //totalQuantitySpan.dataset.qty = qtyArray;
                        totalQuantitySpan.textContent = qtyArray;
                    } else if (newQty == 0) {
                        cart.splice(cart.indexOf(cart[j]), 1)
                        localStorage.setItem("cart", JSON.stringify(cart))
                    } else {
                        alert("Votre panier est vide")
                    }
                    location.reload();
                }
            }
        });
    };
};



