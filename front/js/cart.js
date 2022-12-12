const section = document.getElementById("cart__items");
var cart = window.localStorage.getItem("cart");
if(cart === null){
    var vide = document.createElement("h2");
    vide.innerHTML = "Votre panier est vide";
    section.appendChild(vide);
}else{
    initCart(JSON.parse(cart));
}

/**
 * Initialisation of the cart's lines
 * @param {*} cart 
 */
function initCart(cart){
    cart.forEach(line => {
        getCanap(line.id_canape, line);
    });
}

/**
 * Getting kanapes from API
 * @param {*} id 
 * @param {*} line 
 */
function getCanap(id, line){
    window.fetch("http://localhost:3000/api/products/"+id).then(function(response) {
        return response.json();
      }).then(function(data) {
        constructLineCart(data, line);
      }).catch(function() {
        console.log("Pas de canapé");
      });
}

/**
 * Creating the the lines for the cart
 * @param {*} line 
 * @param {*} canap 
 * @returns 
 */
function constructLineCart(canap, line){
    let article = document.createElement("article");
    article.dataset.id = line.id_canape;
    article.dataset.color = line.id_colors;
    article.classList.add("cart__item");

    let img = document.createElement("img");
    img.setAttribute("src", canap.imageUrl);
    img.setAttribute("alt", canap.altTxt);

    let div_img = document.createElement("div");
    div_img.classList.add("cart__item__img");
    div_img.appendChild(img);
    
    let name = document.createElement("h2");
    name.innerHTML = canap.name;

    let color = document.createElement("p");
    color.innerHTML = line.colors;

    let price = document.createElement("p");
    let priceQuantity = parseInt(line.quantity) * parseInt(canap.price);
    price.innerHTML = priceQuantity + " €";

    let label_quantity = document.createElement("p");
    label_quantity.innerHTML = "Qté :";

    let div_description = document.createElement("div");
    div_description.classList.add("cart__item__content__description");
    div_description.appendChild(name);
    div_description.appendChild(color);
    div_description.appendChild(price);

    let input_quantity = document.createElement("input");
    input_quantity.classList.add("itemQuantity");
    input_quantity.setAttribute("type", "number");
    input_quantity.setAttribute("name", "itemQuantity");
    input_quantity.setAttribute("min", 1);
    input_quantity.setAttribute("max", 100);
    input_quantity.setAttribute("value", line.quantity);

    let div_settings_quantity = document.createElement("div");
    div_settings_quantity.classList.add("cart__item__content__settings__quantity");
    div_settings_quantity.appendChild(label_quantity);
    div_settings_quantity.appendChild(input_quantity);

    let link_delete = document.createElement("p");
    link_delete.classList.add("deleteItem");
    link_delete.innerHTML = "Supprimer";

    let div_settings_delete = document.createElement("div");
    div_settings_delete.classList.add("cart__item__content__settings_delete");
    div_settings_delete.appendChild(link_delete);

    let div_settings = document.createElement("div");
    div_settings.classList.add("cart__item__content__settings");
    div_settings.appendChild(div_settings_quantity);
    div_settings.appendChild(div_settings_delete);

    let div_content = document.createElement("div");
    div_content.classList.add("cart__item__content");
    div_content.appendChild(div_description);
    div_content.appendChild(div_settings);

    article.appendChild(div_img);
    article.appendChild(div_content);

    section.appendChild(article);
}