const url = window.location.search;
const param = new URLSearchParams(url);
const id = param.get("id");
const cart = [];
document.getElementById("addToCart").addEventListener("click", function(){
    
    var product = JSON.stringify({
        "colors" : document.getElementById("colors").value,
        "quantity" : document.getElementById("quantity").value,
        "id_canape" : id,
    });
    if(window.localStorage.length === null){
        cart.push(product);
        window.localStorage.setItem("cart", cart);
        console.log("un seul", cart);
    }else{
        let panier = window.localStorage.getItem("cart");
        cart.push(panier);
        cart.push(product);
        console.log("tableau", cart);
    }
    // window.location.href = "./cart.html";
});

getProduct(id);

function getProduct(id) {
      window.fetch("http://localhost:3000/api/products/"+id).then(function(response) {
        return response.json();
      }).then(function(data) {
        loadDataProduct(data);
      }).catch(function() {
        console.log("Pas de canapé");
      });
}

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
