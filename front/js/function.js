function getCart() {
    let cartArray = JSON.parse(localStorage.getItem("cart"));
    if (cartArray == null) {
        cartArray = [];
    } 
    return cartArray;
}

function updateCart (array){
    localStorage.setItem("cart", JSON.stringify(array));
}
    