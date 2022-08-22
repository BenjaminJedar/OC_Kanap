const items = document.querySelector("#cart__items");

let urlApi = "http://localhost:3000/api/products";

let localStorageArray = getCart();
console.log(localStorageArray);

for (let i = 0; i < localStorageArray.length; i++) {

  //Création du bloc <article>
  const productCard = document.createElement("article");
  items.appendChild(productCard);
  productCard.classList = "cart__item";
  productCard.dataset.id = localStorageArray[i].id;
  productCard.dataset.color = localStorageArray[i].color;

  //Création de la <div> Image
  const productCardImgContainer = document.createElement("div");
  productCard.appendChild(productCardImgContainer);
  productCardImgContainer.classList = "cart__item__img";

  //Création de la balise <img>
  const productCardImg = document.createElement("img");
  productCardImgContainer.appendChild(productCardImg);
  productCardImg.src = localStorageArray[i].img;
  productCardImg.alt = localStorageArray[i].img_alt;

  //Création de la <div> Content
  const productCardContent = document.createElement("div");
  productCard.appendChild(productCardContent);
  productCardContent.classList = "cart__item__content";

  //Création de la <div> Content Description
  const productCardContentDescription = document.createElement("div");
  productCardContent.appendChild(productCardContentDescription);
  productCardContentDescription.classList = "cart__item__content__description";

  //Création du Titre h2 -> Nom du produit
  const productCardContentName = document.createElement("h2");
  productCardContentDescription.appendChild(productCardContentName);
  productCardContentName.innerHTML = localStorageArray[i].name;


  //Création du paragraphe -> Couleur du produit
  const productCardContentColor = document.createElement("p");
  productCardContentDescription.appendChild(productCardContentColor);
  productCardContentColor.innerHTML = localStorageArray[i].color;


  //Création du paragraphe -> Prix du produit
  const productCardContentPrice = document.createElement("p");
  productCardContentDescription.appendChild(productCardContentPrice);
  productCardContentPrice.classList = "cart__item__content__description__price";
  productCardContentPrice.dataset.price = localStorageArray[i].price;
  productCardContentPrice.innerHTML = localStorageArray[i].price + " €";

  //Création de la <div> Content Settings
  const productCardSettings = document.createElement("div");
  productCard.appendChild(productCardSettings);
  productCardSettings.classList = "cart__item__content__settings";

  //Création de la <div> Content Quantity
  const productCardSettingsQuantity = document.createElement("div");
  productCardSettings.appendChild(productCardSettingsQuantity);
  productCardSettingsQuantity.classList = "cart__item__content__settings__quantity";

  //Création du paragraphe "Qté :""
  const productCardSettingsQuantityTitle = document.createElement("p");
  productCardSettingsQuantity.appendChild(productCardSettingsQuantityTitle);
  productCardSettingsQuantityTitle.textContent = "Qté : ";

  //Création de l'input Quantity
  const productCardSettingsQuantityInput = document.createElement("input");
  productCardSettingsQuantity.appendChild(productCardSettingsQuantityInput);
  productCardSettingsQuantityInput.setAttribute("type", "number");
  productCardSettingsQuantityInput.classList = "itemQuantity";
  productCardSettingsQuantityInput.setAttribute("name", "itemQuantity");
  productCardSettingsQuantityInput.setAttribute("min", "1");
  productCardSettingsQuantityInput.setAttribute("max", "100");
  productCardSettingsQuantityInput.setAttribute("value", localStorageArray[i].quantity);

  //Création de la <div> Delete
  const productCardDeleteContainer = document.createElement("div");
  productCardSettings.appendChild(productCardDeleteContainer);
  productCardDeleteContainer.classList = "cart__item__content__settings__delete";

  //Création de la balise <p> du bouton supprimer
  const productCardDeleteButton = document.createElement("p");
  productCardDeleteContainer.appendChild(productCardDeleteButton);
  productCardDeleteButton.classList = "deleteItem";
  productCardDeleteButton.textContent = "Supprimer";

}
removeProduct();
showNumberOfArticles();
makeTotalPrice();
modifyQuantity();



