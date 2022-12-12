const itemsContainer = document.getElementById("items");
const url = "http://localhost:3000/api/products";
const cart = window.localStorage.getItem("cart");
if(cart !== null){
  console.log("panier", cart);
}


getAllProducts(url);


/**
 * get products from the API
 * @param {*} url 
 */
function getAllProducts(url){
    
    window.fetch(url).then(function(response) {
        return response.json();
      }).then(function(data) {
        console.log(data);
        showAllCanape(data);
      }).catch(function() {
        console.log("Pas de canapé");
      });
}

/**
 * Initialisation for the article construction
 * @param {*} data 
 */
function showAllCanape(data){
    console.log("showAllCanape",data);
    console.log("id", itemsContainer);
    data.forEach(canape => {
        constructArticleCanape(itemsContainer, canape);
    });
}
   
/**
 * Build articles for all the canapes
 * @param {*} itemsContainer 
 * @param {*} canape 
 */
function constructArticleCanape(itemsContainer, canape){
    console.log("itemscontainer", itemsContainer);
    console.log("canape", canape);

    var img = document.createElement("img");
    img.setAttribute("src", canape.imageUrl)
    img.setAttribute("alt", canape.altTxt)
    
    var name = document.createElement("h3");
    name.innerHTML = canape.name;

    var description = document.createElement("p");
    description.innerHTML = canape.description;
    
    var article = document.createElement("article");
    article.appendChild(img);
    article.appendChild(name);
    article.appendChild(description);
    
    let link = document.createElement("a");
    link.dataset.idCanape = canape._id;
    link.setAttribute("href", "product.html?id="+canape._id)
    link.appendChild(article);

    itemsContainer.appendChild(link);
}
