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

            for (let j = 0; j < cart.length; j++ ) {
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





