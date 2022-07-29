fetch("http://localhost:3000/api/products")

    .then(function (res) {
        //On récupère la promise et on la convertit au format json
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (product) {
        /*On crée de nouveau éléments de manière dynamique et on les remplit avec nos données récupérées de l'API*/
        for (let i = 0; i < product.length; i++) {
            let section = document.getElementById("items")
            
            section.innerHTML = section.innerHTML + `<a href="./product.html?id=${product[i]._id}"><article><img src="${product[i].imageUrl}" alt="${product[i].altTxt}"><h3 class="productName">${product[i].name}</h3><p class="productDescription">${product[i].description}</p></article></a>`;
        }
    });



