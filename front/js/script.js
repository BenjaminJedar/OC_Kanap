fetch("http://localhost:3000/api/products")

    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (product) {
        for (let i = 0; i < product.length; i++) {
            let section = document.getElementById("items")
            section.innerHTML = section.innerHTML + '<a href="./product.html?id=42"><article><img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1"><h3 class="productName">Kanap name1</h3><p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p></article></a>';

            let h3 = section.querySelector("h3");
            let img = section.querySelector("img");
            let p = section.querySelector(".productDescription");

            img.src = product[i].imageUrl;
            img.alt = product[i].altTxt;
            h3.textContent = product[i].name;
            p.textContent = product[i].description;
        }
    });



