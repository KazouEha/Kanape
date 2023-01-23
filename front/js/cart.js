const section = document.getElementById("cart__items");
const totalPrice = document.getElementById("totalPrice");
const totalQuantity = document.getElementById("totalQuantity");
const url = "http://localhost:3000/api/products/";
const urlOrder = "http://localhost:3000/api/products/order"
var totalPriceArray = [];
var totalQuantityArray = [];
var cart = JSON.parse(window.localStorage.getItem("cart"));

if(cart === null || cart.length === 0){
    var vide = document.createElement("h2");
    vide.innerHTML = "Votre panier est vide";
    section.appendChild(vide);
    let formInvisible = document.getElementsByClassName("cart__order")[0];
    formInvisible.style.display = "none";
}else{
    if(cart.length > 0){
        cart.sort((a, b) => parseInt(a.id_canape) - parseInt(b.id_canape));
    }
    initCart(endInitCart);
}

/**
 * onclick sur la commande pour valider le formulaire et enregistrer le panier
 * dans la requete
 */
document.getElementById("order").addEventListener("click", function(e) {
    
    e.preventDefault();

    const contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value
    }

    const articles = document.querySelectorAll("[data-id]");
    const products = [];
    articles.forEach(element => {
        products.push(element.dataset.id);
    });

    let form = true;
    
    let errorFirstName = document.getElementById("firstNameErrorMsg");
    let errorLastName = document.getElementById("lastNameErrorMsg");
    let errorAddress = document.getElementById("addressErrorMsg");
    let errorCity = document.getElementById("cityErrorMsg");
    let errorMail = document.getElementById("emailErrorMsg");

    if(isValidLetterString(contact.firstName) === true && contact.firstName !== ""){
        errorFirstName.innerHTML = "";
    }else{
        form = false;
        errorFirstName.innerHTML = "Le prénom n'est pas au bon format";
    }
    if(isValidLetterString(contact.lastName) === true && contact.lastName !== ""){
        errorLastName.innerHTML = "";
    }else{
        form = false;
        errorLastName.innerHTML = "Le nom n'est pas au bon format";
    }
    if(isValidString(contact.address) === true && contact.address !== ""){
        errorAddress.innerHTML = "";
    }else{
        form = false;
        errorAddress.innerHTML = "L'adresse n'a pas le bon format";
    }
    if(isValidLetterString(contact.city) === true && contact.city !== ""){
        errorCity.innerHTML = "";
    }else{
        form = false;
        errorCity.innerHTML = "La ville n'est pas au bon format";
    }
    if(isValidEmail(contact.email) === true && contact.email !== ""){
        errorMail.innerHTML = "";
    }else{
        form = false;
        errorMail.innerHTML = "L'adresse mail n'a pas le bon format";
    }

    if(form === true && products.length > 0){

        let param = {
            method: 'POST',
            headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({contact: contact, products: products})
        }
        try {
            getData(urlOrder, getConfirmation, null, param);
        } catch(e){
            console.log(e);
        }
    }

})

/**
 * get confirmation from API for the order
 * 
 * @param {*} data 
 */
function getConfirmation(data){
    window.localStorage.clear();
    window.location.href = "confirmation.html?orderId="+data.orderId;
}

/**
 * 
 * Collection of regex to verify inputs values 
 */
function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  }

function isValidLetterString(string){
    const regex = /^[a-zA-Z]{1,20}$/;
    return regex.test(string);
}

function isValidString(string){
    const regex = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
    return regex.test(string);
}

/**
 * Initialisation of the cart's lines
 * @param {*} cart 
 */
async function initCart(callback){
    while(section.firstChild) {
        section.removeChild(section.firstChild);
    }
    totalPriceArray = [];
    totalQuantityArray = [];
    for(let line in cart){
        let urlLine = url+cart[line].id_canape;
        let lineCanap = await getData(urlLine, constructLineCart, cart[line]);
    }
    callback();
}

/**
 * Retrieve data from API to show product
 * 
 * @param {*} url = API's url + product's id
 * @param {*} callback = function to build article on the page
 * @param {*} param_callback = param for eventual callback function
 * @param {*} param = param for eventual fetch's body
 */
async function getData(url,  callback, param_callback = null, param = null){
    try {
      const response = await fetch(url, param);
      const data = await response.json();
      callback(data, param_callback);
    }
    catch (error) {
      console.log(error);
      return;
    }
  }

/**
 * End of the initialisation with a delay
 */
function endInitCart(){
    calculateTotal(totalPriceArray, totalPrice);
    calculateTotal(totalQuantityArray, totalQuantity);
    deleteFromCart(cart);
}

/**
 * Calculate price & quantity total and show it on the page
 * @param {*} total_Array 
 * @param {*} totalPlace 
 */
function calculateTotal(total_Array, totalPlace){
    let total = 0;
    for(let i = 0; i < total_Array.length; i++ ){
        if(total_Array[i].value){
            total += parseInt(total_Array[i].value);
        }else{
            total += parseInt(total_Array[i]);
        }
    }
    totalPlace.innerHTML = total;
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
    article.dataset.color = line.colors;
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
    totalPriceArray.push(priceQuantity);
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
    totalQuantityArray.push(line.quantity);
    input_quantity.addEventListener("change", function(){
        let kanape = {
            "colors" : line.colors,
            "quantity" : input_quantity.value,
            "id_canape" : line.id_canape
        }
        if(parseInt(input_quantity.value) > 0){
            modifyCart(cart,kanape);
        }else{
            initCart(endInitCart);
        }
    })

    let div_settings_quantity = document.createElement("div");
    div_settings_quantity.classList.add("cart__item__content__settings__quantity");
    div_settings_quantity.appendChild(label_quantity);
    div_settings_quantity.appendChild(input_quantity);

    let link_delete = document.createElement("p");
    link_delete.style.cursor = "pointer";
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


/**
 * modify cart and save it and reinitialize cart
 * 
 * @param {*} cart 
 * @param {*} kanape 
 */
function modifyCart(cart, kanape){
    let idInCart = cart.find(canap => canap.id_canape == kanape.id_canape);
    if(idInCart){
        if(idInCart.colors === kanape.colors){
            idInCart.quantity = kanape.quantity;
            window.localStorage.setItem("cart", JSON.stringify(cart));
        }
    }
    initCart(endInitCart);
}

/**
 * delete from cart and from localstorage item when click then reinitialize cart
 * @param {*} cart 
 */
function deleteFromCart(){
    tableDelete = document.getElementsByClassName("deleteItem");
    for(let deletion of tableDelete){
        deletion.addEventListener("click" , (event) => {
            event.preventDefault();
            let articleDeletion = event.target.closest("article");
            let IdToDelete = event.target.closest("article").dataset.id;
            let colorToDelete = event.target.closest("article").dataset.color;
            let idInCart = cart.find(item => item.id_canape === IdToDelete && item.colors === colorToDelete);
            if(idInCart){
                    articleDeletion.remove();
                    let updatedCart = cart.filter(item => item.id_canape !== IdToDelete || item.colors !== colorToDelete);
                    window.localStorage.setItem("cart", JSON.stringify(updatedCart));
                    cart = JSON.parse(window.localStorage.getItem("cart"));
            }
            initCart(endInitCart);
        })
    }
}


