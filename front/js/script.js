fetch("http://localhost:3000/api/products")

    .then(function (res) {
        //Récupération de la promesse et convertion au format JSON
        if (res.ok) {
            return res.json();
        }
    })
    .catch(function (error){
        console.log("erreur :" + error);
    })
    .then(function (product) {
        /*Création des éléments de manière dynamique complété par les
         données récupérées de l'API*/
        for (let i = 0; i < product.length; i++) {
            let section = document.getElementById("items");

            //Création du lien principal
            const productLink = document.createElement("a");
            section.appendChild(productLink);
            productLink.href = `./product.html?id=${product[i]._id}`;

            //Création de la balise <article>
            const productArticle = document.createElement("article");
            productLink.appendChild(productArticle);

            //Création de l'img du produit
            const productImg = document.createElement("img");
            productArticle.appendChild(productImg);
            productImg.src = product[i].imageUrl;
            productImg.alt = product[i].altTxt

            //Création d'un titre h3 contenant le nom du produit
            const productName = document.createElement("h3");
            productArticle.appendChild(productName);
            productName.classList.add("productName");
            productName.innerHTML = product[i].name;

            //Création d'un paragraphe contenant la description du produit
            const productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            productDescription.classList.add("productDescription");
            productDescription.innerHTML = product[i].description;

        }
    })
    .catch(function (error){
        console.log("erreur :" + error);
    });



