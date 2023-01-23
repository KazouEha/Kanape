const url = window.location.search;
const param = new URLSearchParams(url);
const id = param.get("id");
const urlProduct = "http://localhost:3000/api/products/"+id;
const addToCartBtn = document.getElementById("addToCart");
getData(urlProduct, loadDataProduct);


//event on click to add element to cart
addToCartBtn.addEventListener("click", function(){
    const color = document.getElementById("colors");
    const quantity = document.getElementById("quantity");
    const btn = document.getElementsByClassName("item__content")[0];
    if(color.value !== "" && quantity.value !== "0" && quantity.value !== "" && parseInt(quantity.value) > 0){
        let kanape = {
            "colors" : color.value,
            "quantity" : quantity.value,
            "id_canape" : id
        };
        let cart = getCart();
        addToCart(cart, kanape);
        let command = JSON.stringify(cart);
        window.localStorage.setItem("cart", command);
        callbackMsg("succes", "Votre produit a bien été ajouté au panier");
    }else{
        if(color.value === ""){
            callbackMsg("error", "Choisissez une couleur");
        }
        if(quantity.value === "" || quantity.value === "0" || parseInt(quantity.value) < 0){
            callbackMsg("error", "Choisissez une quantité valide ");
        }
    }
});

/**
 * Add the products chosen to the cart item and verifies quantities
 * @param {*} cart 
 * @param {*} kanape 
 * @returns 
 */
function addToCart(cart, kanape){
    let idInCart = cart.find(canap => canap.id_canape == kanape.id_canape);
    if(idInCart){
        if(idInCart.colors === kanape.colors){
            idInCart.quantity = parseInt(idInCart.quantity) + parseInt(kanape.quantity);
            return cart;
        } else {
            cart.push(kanape);
            return cart;
        }
    }else{
        cart.push(kanape);
    }
}

/**
 * Retrieve datas from localstorage
 * @returns 
 */
function getCart(){
    if(window.localStorage.getItem("cart") == null){
        return [];
    }else{
        return JSON.parse(window.localStorage.getItem("cart"));
    }
}


/**
 * Retrieve data from API to show product
 * 
 * @param {*} url = API's url + product's id
 * @param {*} callback = function to build article on the page
 */
async function getData(url, callback){
    try {
      const response = await fetch(url);
      const data = await response.json();
      callback(data);
    }
    catch (error) {
      console.log(error);
      return [];
    }
  }

/**
 * Show item chosen on the page
 * @param {*} data 
 */
function loadDataProduct(data){
    
    let image = document.createElement("img");
        image.setAttribute("src", data.imageUrl);
        image.setAttribute("alt", data.altTxt);
        
    let image_div = document.getElementsByClassName("item__img")[0];
        image_div.appendChild(image);

    let title = document.getElementById("title");
        title.innerHTML = data.name;

    let price = document.getElementById("price");
        price.innerHTML = data.price;

    let description = document.getElementById("description");
        description.innerHTML = data.description;
    
    let colors = document.getElementById("colors");
        data.colors.forEach(color => {
            let option = document.createElement("option");
            option.innerHTML = color;
            colors.appendChild(option);
        });
}

/**
 * Function to signify by message if a product has been added to the cart or not
 * 
 * @param {*} type 
 * @param {*} message 
 */
function callbackMsg(type, message){
    const btn = document.getElementsByClassName("item__content")[0];
    const color = type === "error" ? "red" : "green";
    let cbMsg = document.getElementById("callback-message");

    if(cbMsg !== null){
        cbMsg.remove();
    }

    cbMsg = document.createElement("div");
    cbMsg.id = "callback-message";
    cbMsg.style.color = color;
    cbMsg.style.fontWeight = "bold";
    cbMsg.style.margin = "auto";
    cbMsg.innerHTML = message;
    btn.appendChild(cbMsg);
}