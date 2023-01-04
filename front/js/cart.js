const section = document.getElementById("cart__items");
const totalPrice = document.getElementById("totalPrice");
const totalQuantity = document.getElementById("totalQuantity");
const totalPriceArray = [];
const totalQuantityArray = [];
const cart = JSON.parse(window.localStorage.getItem("cart"));
console.log(cart);
if(cart === null){
    var vide = document.createElement("h2");
    vide.innerHTML = "Votre panier est vide";
    section.appendChild(vide);
}else{
    initCart();
    endInitCart();
}

document.getElementById("order").onclick = function(){
}
/**
 * Initialisation of the cart's lines
 * @param {*} cart 
 */
function initCart(){
    cart.forEach(line => {
        getCanap(line.id_canape, line);
    });
}

/**
 * Getting kanapes from API
 * @param {*} id 
 * @param {*} line 
 */
async function getCanap(id, line){
    try {
        let response = await fetch("http://localhost:3000/api/products/"+id);
        let data = await response.json();
        constructLineCart(data, line);
    } catch (error) {
        console.log("pas de canape");
    }
}

/**
 * End of the initialisation
 */
function endInitCart(){
    setTimeout(() => {
        calculateTotal(totalPriceArray, totalPrice);
        calculateTotal(totalQuantityArray, totalQuantity);
        deleteFromCart(cart);
    }, 2000);
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
        modifyCart(cart,kanape);
        location.reload();
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
 * modify cart and save it
 * @param {*} cart 
 * @param {*} kanape 
 * @returns 
 */
function modifyCart(cart, kanape){
    let idInCart = cart.find(canap => canap.id_canape == kanape.id_canape);
    if(idInCart){
        if(idInCart.colors === kanape.colors){
            idInCart.quantity = kanape.quantity;
            window.localStorage.setItem("cart", JSON.stringify(cart));
            return cart;
        }
    }
}

/**
 * delete from cart and from localstorage item when click
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
                    console.log("avant set",cart);
                    window.localStorage.setItem("cart", JSON.stringify(updatedCart));
                    location.reload();
                }
            })
        }
}
