//Récupération de l'id renvoyé par le server contenu dans l'url
const id = (new URL(window.location.href)).searchParams.get("id");

//Injection du numéro de commande
const orderId = document.querySelector("#orderId");
orderId.innerHTML = id; 