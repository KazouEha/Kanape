getAllProducts();

//Fonction d'initialisation de la page, récupération de tous les canapés sur l'api et mise en page
function getAllProducts(url){
    var url = "http://localhost:3000/api/products";
    
    window.fetch(url).then(function(response) {
        return response.json();
      }).then(function(data) {
        console.log(data);
        afficheAllCanape(data);
      }).catch(function() {
        console.log("Pas de canapé");
      });
}

// Fonction de mise en page grâce aux données récupérées sur l'API
// Rajout de l'addevent listener et requete pour passer au panier
function afficheAllCanape(data){
    console.log("afficheallcanape",data);
    var itemsContainer = document.getElementById("items");
    console.log("id", itemsContainer);
    data.forEach(canape => {
        constructionArticleCanape(itemsContainer, canape);
    });
}
   
//// Mise en forme du dom en reprenant l'exemple d'article sur index.html
function constructionArticleCanape(itemsContainer, canape){
    console.log("itemscontainer", itemsContainer);
    console.log("canape", canape);
    var lienCanape = document.createElement("a");
    var articleCanape = document.createElement("article");
    var imgCanape = document.createElement("img");
    var nomCanape = document.createElement("h3");
    var descriptionCanape = document.createElement("p");
    lienCanape.dataset.idCanape = canape._id;
    nomCanape.innerHTML = canape.name;
    descriptionCanape.innerHTML = canape.description;
    imgCanape.setAttribute("src", canape.imageUrl)
    imgCanape.setAttribute("alt", canape.altTxt)
    itemsContainer.appendChild(lienCanape);
    lienCanape.appendChild(articleCanape);
    articleCanape.appendChild(imgCanape);
    articleCanape.appendChild(nomCanape);
    articleCanape.appendChild(descriptionCanape);
}
