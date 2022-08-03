function getCart() {
    let cartArray = JSON.parse(localStorage.getItem("cart"));
    if (cartArray == null) {
        cartArray = [];
    } 
    return cartArray;
}

function updateCart (array){
    let cart = JSON.parse(localStorage.getItem("cart"));
    let similarProduct = cart.find((element) => element.id === array.id && element.color === array.color);
    if(similarProduct != null){
        array.quantity = array.quantity + similarProduct.quantity;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}
    
