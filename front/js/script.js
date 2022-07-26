
fetch("http://localhost:3000/api/products")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) {
        console.log(value);
        document.getElementById("items").textContent.value.0.altTxt;
    });

