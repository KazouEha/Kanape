const itemsContainer = document.getElementById("items");
const url = "http://localhost:3000/api/products";
const cart = window.localStorage.getItem("cart");
if(cart !== null){
  console.log("panier", cart);
}


getAllProducts(url);


//Fonction d'initialisation de la page, récupération de tous les canapés sur l'api et mise en page
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

// Fonction de mise en page grâce aux données récupérées sur l'API
// Rajout de l'addevent listener et requete pour passer au panier
function showAllCanape(data){
    console.log("showAllCanape",data);
    console.log("id", itemsContainer);
    data.forEach(canape => {
        constructArticleCanape(itemsContainer, canape);
    });
}
   
//// Mise en forme du dom en reprenant l'exemple d'article sur index.html
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
