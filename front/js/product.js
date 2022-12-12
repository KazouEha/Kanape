const url = window.location.search;
const param = new URLSearchParams(url);
const id = param.get("id");
getProduct(id);


//event on click to add element to cart
document.getElementById("addToCart").addEventListener("click", function(){
    
    var kanape = {
        "colors" : document.getElementById("colors").value,
        "quantity" : document.getElementById("quantity").value,
        "id_canape" : id
    };
    var cart = getCart();
    addToCart(cart, kanape);
    console.log("pret",cart);
    let command = JSON.stringify(cart);
    window.localStorage.setItem("cart", command);
    window.location.href = "./index.html";
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
 * Retrieve data from API
 * @param {*} id 
 */
function getProduct(id) {
      window.fetch("http://localhost:3000/api/products/"+id).then(function(response) {
        return response.json();
      }).then(function(data) {
        loadDataProduct(data);
      }).catch(function() {
        console.log("Pas de canapé");
      });
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
