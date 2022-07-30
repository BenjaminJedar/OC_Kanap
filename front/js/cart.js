let infoPanierJson = localStorage.getItem("cart");
let infoPanier = JSON.parse(infoPanierJson);
alert("Id produit :" + infoPanier.id);
