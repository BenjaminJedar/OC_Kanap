//Récupération du contenu du localStorage
function getCart() {
    let cartArray = JSON.parse(localStorage.getItem("cart"));
    if (Array.isArray(cartArray) == false) {
        //Si le localStorage est vide on crée un tableau vide
        cartArray = [];
    }
    return cartArray;
}

//Mise à jour du contenu du local storage
function updateCart(newProduit) {
    let cart = getCart();
    //Récupère l'index du tableau d'éléments du ls ayant le même id et couleur
    let cartIndex = cart.findIndex((element) => element.id === newProduit.id && element.color === newProduit.color);
    //Si une correspondance est trouvé on incrémente la quantité du produit
    if (cartIndex >= 0) {
        cart[cartIndex].quantity = parseInt(cart[cartIndex].quantity);
        newProduit.quantity = parseInt(newProduit.quantity);
        cart[cartIndex].quantity += newProduit.quantity;
        //On limite la quantité maximum du produit à 100
        if (cart[cartIndex].quantity > 100) {
            alert("La quantité limite est de 100 articles par commande");
            cart[cartIndex].quantity = 100;
        }

    } else {
        /*Si aucune correspondance n'est trouvé, 
        alors on ajoute le produit au tableau d'élément à renvoyer dans le ls*/
        cart.push(newProduit);
    }
    //On injecte dans le ls
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Produit ajouté au panier !")
    console.log(cart);
}

//Suppression d'un produit du panier
function removeProduct() {
    //Création d'un tableau contenant tout les boutons supprimer des produits
    let arrayOfProductToDelete = document.querySelectorAll(".deleteItem");
    let cart = getCart();

    for (let i = 0; i < arrayOfProductToDelete.length; i++) {
        let elementOfProductToDelete = arrayOfProductToDelete[i];
        //Selection de la balise article 
        let targetOfProductToDelete = elementOfProductToDelete.closest("article");

        //Mise en place de l'événement au click du bouton
        arrayOfProductToDelete[i].addEventListener("click", () => {
            let deleteProductid = targetOfProductToDelete.dataset.id;
            let deleteProductColor = targetOfProductToDelete.dataset.color;

            for (let j = 0; j < cart.length; j++) {
                //Si le produit à le même id et la même couleur, on supprime le produit du panier
                if (deleteProductid === cart[i].id && deleteProductColor === cart[i].color) {
                    cart.splice(i, 1);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    //Si le tableau d'élément du panier est vide on réinitialise le ls en supprimant le panier et en rechargeant la page
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

//Calcul et affichage du nombre d'article total
function showNumberOfArticles() {
    let cart = getCart();
    let qtyArticle = 0;
    //On additionne toutes les quantités de produit
    for (let i = 0; i < cart.length; i++) {
        qtyArticle += parseInt(cart[i].quantity);
    }
    let totalQuantity = document.querySelector("#totalQuantity");
    totalQuantity.textContent = qtyArticle;
}

//Calcul et affichage du prix total
function makeTotalPrice() {
    let cart = getCart();
    let totalPrice = 0;
    let pricePerProduct = 0;
    //Pour chaque produit une calcul le prix total en fonction des articles puis on additionne tout les totaux
    for (let i = 0; i < cart.length; i++) {
        pricePerProduct = parseInt(cart[i].quantity) * parseInt(cart[i].price);
        totalPrice += pricePerProduct;
    }
    let totalCartPrice = document.querySelector("#totalPrice");
    totalCartPrice.textContent = totalPrice;
}

//Requête vers API pour récupérer les caractéristique du produit à l'id associé et renvoie les datas
async function getArticle(productId) {
    const catchArticles = await fetch("http://localhost:3000/api/products/" + productId)
        .then((catchArticles) => catchArticles.json())
        .then(function (data) {
            article = data;
        })
    return article;
}

//Modification de la quantité des articles dans la page panier
function modifyQuantity() {
    //Selection des inputs de quantité
    const inputQuantity = document.querySelectorAll(".itemQuantity");
    let cart = getCart();

    //Pour chaque input on selection la balise article associé pour effectuer le changement
    for (let i = 0; i < inputQuantity.length; i++) {
        const target = inputQuantity[i].closest("article");
        //Mise en place de l'événement de type change sur les inputs de manière asynchrone
        inputQuantity[i].addEventListener("change", async function () {
            let changingProductid = target.dataset.id;
            let changingProductColor = target.dataset.color;
            let newQty = inputQuantity[i].value;

            for (let j = 0; j < cart.length; j++) {
                //Récupération des infos du produit
                const article = await getArticle(cart[i].id);
                //Si le produit selectionné correspond au même id et couleur alors l'événenment modifi la quantité de l'article
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

                        sumArray = sumArray.reduce((a, b) => a + b);
                        qtyArray = qtyArray.reduce((a, b) => a + b);

                        const totalPriceSpan = document.querySelectorAll("#totalPrice");
                        totalPriceSpan.textContent = sumArray;

                        const totalQuantitySpan = document.querySelectorAll("#totalQuantity");
                        totalQuantitySpan.textContent = qtyArray;
                    } else if (newQty == 0) {
                        cart.splice(cart.indexOf(cart[j]), 1);
                        localStorage.setItem("cart", JSON.stringify(cart));
                    }
                    location.reload();
                }
            }
        });
    };
};

//Vérification du bon remplissage des champs par l'utilisateur
function formValidator() {

    //Pointage sur l'email
    let email = document.querySelector("#email");

    const validEmail = function (inputEmail) {
        //Regex d'acceptation de l'email
        let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]{1,50}[@]{1}[a-zA-Z0-9.-_]{1,50}[.]{1}[a-z]{2,10}$', 'g');

        let testEmail = emailRegExp.test(inputEmail.value);
        let errorMessage = inputEmail.nextElementSibling;

        if (inputEmail.value === "") {
            errorMessage.innerHTML = "";
        } else if (testEmail === false) {
            //Si les données saisies par l'utilisateur ne sont pas contenu dans la regex alors affichage message erreur
            errorMessage.innerHTML = "Adresse mail invalide";
        } else if (testEmail === true) {
            errorMessage.innerHTML = "";
        }
    }

    const validInfo = function (inputInfo) {
        //Mise en place d'une regex d'acceptation
        let infoRegExp = new RegExp('^[a-zA-Z-_./]{2,50}$', 'g');

        let testInfo = infoRegExp.test(inputInfo.value);
        let errorMessage = inputInfo.nextElementSibling;

        if (inputInfo.value === "") {
            errorMessage.innerHTML = "";
        } else if (testInfo === false) {
            errorMessage.innerHTML = "Le champ doit être compris entre 2 et 50 caractères, les symboles ne sont pas autorisés.";
        } else if (testInfo === true) {
            errorMessage.innerHTML = "";
        }
    }

    //Appelle de la fonction de validation de l'email sur un événement de type change d'un champ de saisie
    email.addEventListener("change", function () {
        validEmail(this);
    });

    //Pointage des éléments
    let lastName = document.querySelector("#lastName");
    let firstName = document.querySelector("#firstName");
    let city = document.querySelector("#city");
    let address = document.querySelector('#address');

    //Appelle de la fonction de validation des input sur un événement de type change d'un champ de saisie
    lastName.addEventListener("input", function () {
        validInfo(this);
    });

    firstName.addEventListener("input", function () {
        validInfo(this);
    });

    city.addEventListener("input", function () {
        validInfo(this);
    });
};

//Création des data JSON à envoyer à l'API constitué d'un objet contenat les 
//informations de l'utilisateur et un tableau des produits à commander
function createJsonData() {
    let contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
    };
    let items = getCart();
    let products = [];
    //Remplissage du tableau de produit en récupérant le panier via le ls
    for (i = 0; i < items.length; i++) {
        products.push(items[i].id);
    }
    //Convertion des datas en chaine de caractère prêt pour l'envoie sur l'API
    let dataJson = JSON.stringify({ contact, products });
    return dataJson;
}

//Envoyer les informations au server via l'API et attendre en 
//retour la réponse du backend pour obtenir l'id qui servira de numéro de commande
function postCart() {
    //Pointage du bouton
    const orderButton = document.getElementById("order");
    //Mise en place d'un événement au click du bouton qui 
    //appelera une fonction permettant de réaliser un fetch de type POST
    orderButton.addEventListener("click", (e) => {
        //Suppression de la réaction narurelle du bouton
        e.preventDefault();
        //Récupération des datas utilisateur
        let jsonData = createJsonData();

        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: jsonData,
        })
            .then((res) => res.json())
            .then((data) => {
                //Réorientation de l'utilisateur sur la page de confirmation 
                //de commande avec orderId qui est retourné par le server via l'url
                localStorage.clear();
                window.location.href = "./confirmation.html?id=" + data.orderId;
            }
            )
    });
};