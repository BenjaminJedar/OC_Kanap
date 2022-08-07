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




