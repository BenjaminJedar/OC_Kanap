function getCart() {
    let cartArray = JSON.parse(localStorage.getItem("cart"));
    if (cartArray == null) {
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
        cart[cartIndex].quantity = JSON.stringify(cart[cartIndex].quantity);
    } else {
        cart.push(newProduit);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);
}


